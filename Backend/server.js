const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const http = require('http').createServer(app)
// Express App Config
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    // Configuring CORS
    const corsOptions = {
        // Make sure origin contains the url your frontend is running on
        origin: ['http://127.0.0.1:3030', 'http://localhost:5173'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// const taskRoutes = require('./api/task/task.routes')
const userRoutes = require('./api/user/user.routes')
const authRoutes = require('./api/auth/auth.routes')
const statusRoutes = require('./api/status/status.routes')

app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/status',statusRoutes)


const {setupSocketAPI} = require('./services/socket.back.service')


// routes
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)

setupSocketAPI(http)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/wap/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service.js')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})
