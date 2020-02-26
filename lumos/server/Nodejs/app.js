const app = require('express')();
const http = require('http').createServer(app); //TODO: change to HTTPS
const bodyParser = require('body-parser');
const child_process = require('child_process');

const chrome = require('./chrome');
app.use(bodyParser.json())

const PORT = process.env.PORT;

http.listen(PORT, function () {
    console.log(`Listening on PORT ${PORT}`);
});

if (process.env.AUTO_LAUNCH_VNC) {
    child_process.exec('vncviewer');
}

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