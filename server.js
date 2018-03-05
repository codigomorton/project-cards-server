const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var http = require('http').Server(express);
var io = require('socket.io')(http);

express()
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index.html'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

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