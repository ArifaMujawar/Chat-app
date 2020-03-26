const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter = require('bad-words')
const {generateMessage, generateLocationMessage} = require('./utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("New WebSocket connection");

  socket.on('join', ({ username, room})=>{
    socket.join(room)

    socket.emit("message", generateMessage('Welcome!'));
    socket.broadcast.to(room).emit('message',generateMessage( `${username} has joined!`))
  })
  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter()
    if(filter.isProfane(message)){
      return callback('Profanity is not allowed')
    }
    io.to('Center City').emit("message", generateMessage(message));
    callback();
  });


  socket.on("sendLocation", (coords, callback) => {
    io.emit(
      "locationMessage",
      generateLocationMessage(`https://google.com/maps?${coords.latitude},${coords.longitude}`)
    );
    callback();
  });
  socket.on("disconnect", () => {
    io.emit("message", generateMessage("A user has left"));
  });
});

server.listen(port, () => {
  console.log(`App is up on port ${port}`);
});


/**
 * socket.emit : sends event ot specific client
 * io.emit : sends event to every connected client
 * socket.broadcast.emit : sends event to every connected client except the socket one
 * 
 * io.to.emit : sends event to everybody in specific room
 * socket.broadcast.to.emit : sends event to everyone except specific client limiting to specific room
 * 
 */