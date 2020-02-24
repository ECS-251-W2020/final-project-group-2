const app = require('express')();
const http = require('http').createServer(app); //TODO: change to HTTPS
// var io = require('socket.io').(http);
const io = require('socket.io').listen(http);
const launch = require('./launch.js');
const cookieHandler = new CookieHandler();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/HTML/index.html');
});

http.listen(3002, function() {
  console.log('Listening on PORT 3002');
});

io.on('connection', function(socket) {
  console.log('Connected');
  socket.on('click', function(msg) {
    launch.launch(msg, function(cookies) {
      socket.emit('login', cookies);
    });
    
  })

  socket.on('export-cookies', function(data){
    console.log(data);
    launch.launch(msg, function(cookies) {
        socket.emit('login', cookies);
      });
    yummy_cookies = JSON.parse(json);
    yummy_cookies.forEach(cookie => {
        // Make sure we are using the right store ID. This is in case we are importing from a basic store ID and the
        // current user is using custom containers
        cookie.storeId = cookieHandler.currentTab.cookieStoreId;

        cookieHandler.saveCookie(cookie, getCurrentTabUrl(), function(error, cookie) {
          if (error) {
            sendNotification(error);
          }
        });
      });
  });
});