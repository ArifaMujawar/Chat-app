const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

io.on('connection', ()=>{
  console.log('New Websocket connection')
})
app.use(express.static(publicDirectoryPath))

server.listen(port, ()=>{
console.log(`App is up on port ${port}`)
})