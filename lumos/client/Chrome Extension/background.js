'use strict;'

const url = 'http://localhost:5800/request'

function getCurrentTab(callback) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        if (tabs[0]) {
            callback(tabs[0].url);
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
    }).then(response => callback(response));
}

function exportUrl() {
    getCurrentTab(function (tabUrl) {
        postReq(url, {
            value: tabUrl
        }, response => {
            //HAIXIN: call the second extension code here!



        });
    });
}

chrome.browserAction.onClicked.addListener(exportUrl);