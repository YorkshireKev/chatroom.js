/*
  This is the client side JavaScript.
  This is a VERY basic client. It is little more than the 'hello world' of chatrooms!
  
  Good improvements would be:
   to prevent the user from sending empty messages
   to force the user to enter a username
*/

var socket = io.connect();
socket.on('chatmessage', function (data) {
  div = document.getElementById('chatHistory');
  div.innerHTML = div.innerHTML + '<br />' + data.user + ': ' + data.message;
  window.scrollTo(0,document.body.scrollHeight);
});

function sendChatText(){
	socket.emit('chatmessage', { user: document.getElementById("userName").value,
							message: document.getElementById("inputLine").value }); //Send to server.
	document.getElementById("inputLine").value=""; //Clear line ready for next message input.
	document.getElementById("inputLine").focus(); //Set input focus ready for next message.
};