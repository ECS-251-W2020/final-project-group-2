const app = require('express')();
const http = require('http').createServer(app); //TODO: change to HTTPS
const io = require('socket.io').listen(http);
const bodyParser = require('body-parser');

const chrome = require('./chrome');
app.use(bodyParser.json())

const PORT = process.env.PORT;

http.listen(PORT, function () {
    console.log(`Listening on PORT ${PORT}`);
});

//REST APIs

let cookies = 'wait';

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/HTML/index.html');
});

app.post('/request', function (req, res) {
    chrome.launch(req.body.value);
    res.send('Received: ' + req.body);
    console.log('URL Received: ' + req.body.value)
});

app.post('/cookies', function (req, res) {
    cookies = req.body;
    res.send('Received: ' + req.body);
    chrome.killAll();
    console.log('Cookies Received');
});

app.get('/cookies', function (req, res) {
    if (cookies === 'wait') res.send({
        "wait": true
    });
    else {
        res.send(cookies);
        cookies = 'wait';
    }
});

//SOCKET APIs

io.on('connection', function (socket) {
    console.log('Connected');
    socket.on('send-url', function (msg) {
        chrome.launch(msg);
    })

    socket.on('export-cookies', function (cookies) {
        socket.emit('import-cookies', cookies);
        console.log(cookies)
    });

    socket.on('errorlog', function (error) {
        console.log(error);
    });

    socket.on('consolelog', function (msg) {
        console.log(msg);
    });
});