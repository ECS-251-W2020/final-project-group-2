// const {spawn} = require('child_process');

// function launch(address, callback) {
//     const child = spawn('chromium-browser ' + address, {
//         stdio: 'inherit',
//         shell: true
//     });

//     console.log(address);

//     let cookies = null;
//     callback(cookies);
// }

// module.exports.launch = launch;

// // Need to grab the URL and sign-in button
// const puppeteer = require('puppeteer');
// const child_process = require('child_process');
const ChromeLauncher = require('chrome-launcher');

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
        ]
    }).then(chrome => {
        console.log(`Chrome debugging port running on ${chrome.port}`);
    });
    console.log(address);
}

module.exports.launch = launch;