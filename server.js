var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', process.env.PORT || 8080);
app.set('address', process.env.IP || '127.0.0.1');
app.use(express.static('app'));

app.get('/', function(req, res) {
  console.log('heeeey');
  res.render('index.html');
});

http.listen(app.get('port'), app.get('address'), function(){
  console.log('Express server listening on  IP: ' + app.get('address') + ' and port ' + app.get('port'));
});

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