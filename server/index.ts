import express from 'express'
import fs from 'fs'
import path from 'path'
import {renderHtml} from "./render";

const server = express()

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

// Static middleware with error logging
server.use('/', express.static(path.join(__dirname, 'static')))

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

server.get('/demo', (req, res) => {
    try {
        const component = renderHtml(req.url);
        res.render('index', { assets: jsAssets, component })
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
