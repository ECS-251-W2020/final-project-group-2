const app = require('express')();
const http = require('http').createServer(app); //TODO: change to HTTPS
const bodyParser = require('body-parser');
const child_process = require('child_process');

const chrome = require('./chrome');
app.use(bodyParser.json())

const PORT = process.env.PORT;
const PIN = process.env.PIN;

http.listen(PORT, function () {
    console.log(`Listening on PORT ${PORT}`);
});

if (process.env.AUTO_LAUNCH_VNC) {
    child_process.exec('vncviewer');
}

//REST APIs

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/HTML/index.html');
});

app.post('/request', function (req, res) {
    if (req.body.PIN == PIN) {
        chrome.launch(req.body.value);
        res.send({
            'Received': 'true',
        });
        console.log('URL Received: ' + req.body.value);
    } else {
        res.send({
            'PIN': 'Incorrect'
        })
    }

});

app.post('/cookies', function (req, res) {
    let content = req.body;
    let url = content.shift().url;
    let cookies = content;

    chrome.storeCookies(url, cookies);
    res.send({
        'Received': 'true',
    });
    console.log('Cookies Received');
});

app.post('/get-cookies/', function (req, res) {
    let url = req.body.url;
    let cookies = chrome.getCookies(url);
    if (cookies === null) res.send({
        "wait": true
    });
    else {
        res.send(cookies);
        chrome.kill(url);
    }
});