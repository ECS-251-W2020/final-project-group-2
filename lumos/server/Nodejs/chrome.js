// const child_process = require('child_process');

const ChromeLauncher = require('chrome-launcher');

let chromeSessions = [];

function launch(address) {
    //Write code for launching chrome here
    //"address" is passed in via socket. CANNOT BE TRUSTED TO BE VALID/WELL FORMED. POTENTIALLY MALICIOUS
    
    ChromeLauncher.launch({
        startingUrl: address,
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
        chromeSessions.push({"address": address, "kill": chrome.kill});
    });
}

function kill(address) {
    for (key in chromeSessions) {
        if (chromeSessions[key].address = address) chromeSessions[key].kill();
    }
}

function killAll() {
    for (key in chromeSessions) {
        chromeSessions[key].kill();
    }
}

module.exports.launch = launch;
module.exports.kill = kill;
module.exports.killAll = killAll;