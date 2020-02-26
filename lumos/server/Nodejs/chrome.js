const ChromeLauncher = require('chrome-launcher');

let chromeSessions = [];

function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}

function launch(url) {
    //Write code for launching chrome here
    //"url" is passed in via socket. CANNOT BE TRUSTED TO BE VALID/WELL FORMED. POTENTIALLY MALICIOUS
    
    ChromeLauncher.launch({
        startingUrl: url,
        userDataDir: false,
        ignoreDefaultFlags: true,
        chromeFlags: [
            '--disable-features=TranslateUI',
            '--disable-background-networking',
            '--disable-sync',
            '--metrics-recording-only',
            '--disable-default-apps',
            '--no-default-browser-check',
            '--no-first-run',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-background-timer-throttling',
        ]
    }).then(chrome => {
        chromeSessions.push({"hostname": getHostName(url), "kill": chrome.kill, "cookies": null});
    });
}

function kill(url) {
    hostname = getHostName(url);
    for (key in chromeSessions) {
        if (chromeSessions[key].hostname = hostname) {
            chromeSessions[key].kill()
            chromeSessions.splice(key, 1);
        };
    }
}

function killAll() {
    for (key in chromeSessions) {
        chromeSessions[key].kill();
    }
    chromeSessions = [];
}

function getSessions() {
    return chromeSessions;
}

function getCookies(url) {
    hostname = getHostName(url);
    for (key in chromeSessions) {
        if (chromeSessions[key].hostname = hostname) return chromeSessions[key].cookies;
    }
}

function storeCookies(url, cookies) {
    hostname = getHostName(url);
    for (key in chromeSessions) {
        if (chromeSessions[key].hostname = hostname) chromeSessions[key].cookies = cookies;
    }
}

module.exports.launch = launch;
module.exports.kill = kill;
module.exports.killAll = killAll;
module.exports.getSessions = getSessions;
module.exports.getCookies = getCookies;
module.exports.storeCookies = storeCookies;