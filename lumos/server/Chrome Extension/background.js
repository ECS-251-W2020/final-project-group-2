'use strict;'

let options = {
    url: 'http://localhost',
    port: 5800,
    PIN: 1234
}

function update_options() {
    console.log('settings updated')
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
    update_options();
    getCookies((cookies) => {
        getCurrentTab(function (tabUrl) {
            console.log(cookies);
            return postReq(`${options.url}:${options.port}/cookies`, {
                url: tabUrl,
                PIN: options.PIN,
                cookies: cookies,
            });
        });
    });
}

chrome.runtime.onMessage.addListener(function() {
    console.log('got message');
    setTimeout(function() {
        exportCookies();
    }, 1000);
});

chrome.storage.onChanged.addListener(update_options);
chrome.browserAction.onClicked.addListener(exportCookies);