'use strict;'

const url = 'http://localhost:5800/request'

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
        postReq(url, {
            value: tab.url
        }, response => {
            //HAIXIN: call the second extension code here!



        });
    });
}

chrome.browserAction.onClicked.addListener(exportUrl);