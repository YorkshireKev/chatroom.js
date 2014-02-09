/*
  This is the Server Side JavaScript.
  This is a VERY basic Server. It is little more than the 'hello world' of chatrooms!
*/

var	express = require('express'),
		http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

//html, css and javascript files served from sub-directory
app.use(express.static(__dirname + '/public'));


//Serve the index page for requests made to the app root URL 
app.get('/', function (req, res) {
res.sendfile(__dirname + '/public/index.html');
});

//Set socket.io console logging level. (Default is 3 - debug)
//0 - Error, 1 - Warnings, 2 - info, 3 - Debug.
io.set('log level', 1); // reduce socket.io console logging

//Create the socket.io listener...
io.sockets.on('connection', function (socket) {
  socket.emit('chatmessage', { user: 'ChatServer', message: 'Welcome to the barebones chatroom!' } );

  
  socket.on('chatmessage', function (data) {
  	io.sockets.emit('chatmessage', { user: data.user, message: data.message } );
    console.log(data);
  });
});

server.listen(3000);
console.log('Listening on port 3000');