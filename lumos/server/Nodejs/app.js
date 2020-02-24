const app = require('express')();
const http = require('http').createServer(app); //TODO: change to HTTPS
const io = require('socket.io').listen(http);
const bodyParser = require('body-parser');

const launch = require('./launch.js');
app.use(bodyParser.json())


const PORT = 5800;

http.listen(PORT, function() {
  console.log(`Listening on PORT ${PORT}`);
});


//REST APIs

let cookies = '{key: "wait"}';

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/HTML/index.html');
});

app.post('/request', function(req, res) {
  launch.launch(req.body.value);
  res.send('Received: ' + req.body);
});

app.post('/cookies', function(req, res) {
  cookies = req.body;
  console.log('Cookies recieved')
});

app.get('/cookies', function(req, res) {
  if(cookies === 'wait') res.send({"wait":true});
  else{
    res.send(cookies);
    // cookies = 'wait';
  } 
});



//SOCKET APIs

io.on('connection', function(socket) {
  console.log('Connected');
  socket.on('send-url', function(msg) {
    launch.launch(msg);
  })

  socket.on('export-cookies', function(cookies){
    socket.emit('import-cookies', cookies);
    console.log(cookies)
  });

  socket.on('errorlog', function(error) {
    console.log(error);
  });

  socket.on('consolelog', function(msg) {
    console.log(msg);
  });

});