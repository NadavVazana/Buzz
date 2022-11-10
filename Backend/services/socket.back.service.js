var gIo = null

const userService = require('../api/user/user.service')
async function setupSocketAPI(http) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*'
        }
    })

    gIo.on('connection', socket => {
        // console.log('Connected To Socket!')


        socket.on('load-statuses',(statuses)=>{
            socket.broadcast.emit('apply-load-status',statuses)

        })


        socket.on('user-logged-in',(user)=>{
            socket.join(user._id)
            user.isLoggedIn = true
            userService.update(user)
            socket.broadcast.emit('apply-user-login',user)
        })

        socket.on('user-logged-out',user=>{
            user.isLoggedIn = false
            userService.update(user)
            socket.broadcast.emit('apply-user-login',user)
        })
        socket.on('send-message',info=>{
            socket.to(info.to._id).emit('message-notification',info.from)
        })


        })
  



    }
    async function getUserSocket(siteId) {
        const sockets = await _getAllSockets()
        const socket = sockets.find(s =>{
           return s.siteId === siteId.toString()})

        return socket
    }

    async function _getAllSockets() {
        const sockets = await gIo.fetchSockets()
        return sockets
    }



module.exports = {
    setupSocketAPI
}