const app = require('express')();
const http = require('http').createServer(app); //TODO: change to HTTPS
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
  socket.on('send-url', function(msg) {
    launch.launch(msg);
  })

  // socket.on('export-cookies', function(cookies){
  //   socket.emit('import-cookies', cookies);
  //   console.log(cookies)
  // });

  socket.on('errorlog', function(error) {
    console.log(error);
  });

  socket.on('consolelog', function(msg) {
    console.log(msg);
  });

});