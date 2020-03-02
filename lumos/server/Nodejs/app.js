const app = require('express')();
const bodyParser = require('body-parser');
const child_process = require('child_process');
const fs = require('fs');
const chrome = require('./chrome');

const PORT = process.env.PORT;
const PIN = process.env.PIN;

app.use(bodyParser.json())

let http;

if (process.env.USE_HTTPS === 'true') {
    let key = fs.readFileSync(process.env.TLS_PRIVATE_KEY);
    let cert = fs.readFileSync(process.env.TLS_CERTIFICATE);

    let options = {
        key: key,
        cert: cert,
    }

    http = require('https').createServer(options, app);
} else {
    http = require('http').createServer(app);
}

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
        console.log('Incorrect PIN!');
        res.send({
            'PIN': 'Incorrect',
        });
    }

});

app.post('/cookies', function (req, res) {
    if (req.body.PIN == PIN) {
        let content = req.body;
        let url = content.url;
        let cookies = content.cookies;

        chrome.storeCookies(url, cookies);
        res.send({
            'Received': 'true',
        });
        console.log('Cookies Received');
    } else {
        console.log('Incorrect PIN!');
        res.send({
            'PIN': 'Incorrect',
        });
    }
});

app.post('/get-cookies', function (req, res) {
    if (req.body.PIN == PIN) {
        let url = req.body.url;
        let cookies = chrome.getCookies(url);
        if (cookies === undefined) {
            res.send({
                wait: true,
            });
        }
        // if (cookies === null) res.send('test');
        else {
            res.send(cookies);
            chrome.kill(url);
        }
    } else {
        console.log('Incorrect PIN!');
        res.send({
            'PIN': 'Incorrect',
        });
    }
});