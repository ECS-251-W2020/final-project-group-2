const app = require('express')();
const http = require('http').createServer(app); //TODO: change to HTTPS
const io = require('socket.io')(http);
const launch = require('./launch.js');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/HTML/index.html');
});

http.listen(3000, function () {
    console.log('Listening on PORT 3000');
});

io.on('connection', function (socket) {
    console.log('Connected');
    socket.on('click', function(msg) {

    })
});

