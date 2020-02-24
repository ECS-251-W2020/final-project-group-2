const app = require('express')();
const http = require('http').createServer(app); //TODO: change to HTTPS
// var io = require('socket.io').(http);
const io = require('socket.io').listen(http);
const launch = require('./launch.js');

// const cookieHandler = new CookieHandler();

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
    
    yummy_cookies = JSON.parse(data);
    var getActive = browser.tabs.query({active: true, currentWindow: true});
    getActive.then(setCookie);

    function setCookie(tabs) {
      browser.cookies.set(yummy_cookies);
    }
    // yummy_cookies.forEach(cookie => {
    //     // Make sure we are using the right store ID. This is in case we are importing from a basic store ID and the
    //     // current user is using custom containers
    //     cookie.storeId = cookieHandler.currentTab.cookieStoreId;

    //     cookieHandler.saveCookie(cookie, getCurrentTabUrl(), function(error, cookie) {
    //       if (error) {
    //         sendNotification(error);
    //       }
    //     });
    //   });
    console.log("cookieesssssss");
  });
});