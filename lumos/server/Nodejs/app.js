const app = require('express')();
const http = require('http').createServer(app); //TODO: change to HTTPS
// var io = require('socket.io').(http);
const io = require('socket.io').listen(http);
const launch = require('./launch.js');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/HTML/index.html');
});

const PORT = 5800;

http.listen(PORT, function() {
  console.log(`Listening on PORT ${PORT}`);
});

io.on('connection', function(socket) {
  console.log('Connected');
  socket.on('click', function(msg) {
    launch.launch(msg, function(cookies) {
      socket.emit('login', cookies);
    });
    
  })

  socket.on('export-cookies', function(data){
    console.log('Exporting Cookies');
    // launch.launch(msg, function(cookies) {
    //     socket.emit('login', cookies);
    //   });
    
    yummy_cookies = JSON.parse(json);
    console.log(yummy_cookies);
    console.log("cookieesssssss");
  });
});