import express from 'express'
import fs from 'fs'
import path from 'path'
import React, { FC } from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../app/src/App'

const server = express()

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

// Static middleware with error logging
server.use('/', express.static(path.join(__dirname, 'static'), {
    fallthrough: false, // Log errors for missing static files
}))

let assets;
try {
    const manifest = fs.readFileSync(
        path.join(__dirname, 'static/manifest.json'),
        'utf-8'
    )
    assets = JSON.parse(manifest)
} catch (err) {
    console.error('Failed to read manifest.json:', err)
    process.exit(1) // Exit gracefully if assets fail to load
}

server.get('/', (req, res) => {
    try {
        const component = ReactDOMServer.renderToString(React.createElement(App as FC))
        console.log('component', component)
        res.render('client', { assets, component })
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
