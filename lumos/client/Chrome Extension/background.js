'use strict;'

<<<<<<< HEAD
const url = 'http://192.168.1.18:5800/request'
=======
let options = {
    url: 'http://localhost',
    port: 5800,
    PIN: 1234
}

function update_options() {
    chrome.storage.local.get({
        host: 'http://localhost',
        port: 5800,
        PIN: 1234
    }, function (items) {
        options.url = items.host;
        options.port = items.port;
        options.PIN = items.PIN;
    });
}
>>>>>>> b535006d0587f1cbcfee8a79c0e6316c1c31f904

function getCurrentTab(callback) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        if (tabs[0]) {
            callback(tabs[0]);
        }
    });
}

function postReq(url, content, callback) {
    fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, *.*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(res => callback(res));
}

function exportUrl() {
    getCurrentTab(function (tab) {
        postReq(`${options.url}:${options.port}/request`, {
            value: tab.url,
            PIN: options.PIN
        }, response => {
            //HAIXIN: call the second extension code here!


        });
    });
}

chrome.storage.onChanged.addListener(update_options);
chrome.browserAction.onClicked.addListener(exportUrl);