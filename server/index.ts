import express from 'express'
import fs from 'fs'
import path from 'path'
import compression from 'compression'
import {renderHtml} from "./render";
import serialize from "serialize-javascript";
import {DataItem} from "../src/DemoPage";

const server = express()

// Enable compression middleware
server.use(compression())

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

// Static middleware with error logging
server.use('/', express.static(path.join(__dirname, 'static'), {
    maxAge: '1y', // Cache static assets for one year
    etag: false, // Disable etag headers if using maxAge
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache')
        }
    }
}))

let jsAssets: Map<string, string>;
try {
    const manifest = fs.readFileSync(
        path.join(__dirname, 'static/manifest.json'),
        'utf-8'
    )
    jsAssets = JSON.parse(manifest)
} catch (err) {
    console.error('Failed to read manifest.json:', err)
    process.exit(1) // Exit gracefully if assets fail to load
}

const fetchDataFromServer = (): Promise<DataItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Item 1', description: 'Description of Item 1' },
                { id: 2, name: 'Item 2', description: 'Description of Item 2' },
                { id: 3, name: 'Item 3', description: 'Description of Item 3' },
            ]);
        }, 1000); // Simulate a 1-second server delay
    });
};

server.get('*', async (req, res) => {
    try {
        const items = await fetchDataFromServer()
        const initialData = {propFromSsr: "It's SSR baby", items: items};

        const html = renderHtml(req.url, initialData);
        res.render('index', {
            assets: jsAssets,
            component: html,
            initialData: serialize(initialData)
        })
    } catch (err) {
        console.error('Error rendering React component:', err)
        res.status(500).send('Internal Server Error')
    }
})

// Start the server and listen on a port
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
