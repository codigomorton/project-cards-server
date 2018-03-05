const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 5000

const server = express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.sendFile('public/index.html'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const io = socketIO(server);

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('chat message', function(msg) {
  	io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
  socket.on('card played', function(msg) {
  	io.emit('card played', msg);
    console.log('card: ' + msg);
  });
});