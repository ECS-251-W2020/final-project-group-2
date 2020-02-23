/* Uses Open API to launch default web browser
 * https://github.com/sindresorhus/open
 * This portion of the code belongs in the PI
 * Make sure Puppeteer is installed
 */

// Need to grab the URL and sign-in button
const puppeteer = require('puppeteer');
const child_process = require('child_process');
const ChromeLauncher = require('chrome-launcher');

function launch(address, callback) {
    //Write code for launching chrome here
    //"address" is passed in via socket. CANNOT BE TRUSTED TO BE VALID/WELL FORMED. POTENTIALLY MALICIOUS
    ChromeLauncher.launch({
        startingUrl: address,
    }).then(chrome => {
        console.log(`Chrome debugging port running on ${chrome.port}`);
    });
    console.log(address);
    let cookies = null;
    callback(cookies);
}

module.exports.launch = launch;
