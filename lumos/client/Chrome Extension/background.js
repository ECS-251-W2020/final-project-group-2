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

function saveCookie(cookie, url) {
    const newCookie = {
        domain: cookie.domain || '',
        name: cookie.name || '',
        value: cookie.value || '',
        path: cookie.path || null,
        secure: cookie.secure || null,
        httpOnly: cookie.httpOnly || null,
        expirationDate: cookie.expirationDate || null,
        storeId: cookie.storeId || this.currentTab.cookieStoreId || null,
        url: url
    };
    if (cookie.hostOnly) {
        newCookie.domain = null;
    }
    chrome.cookies.set(newCookie, (cookieResponse) => {
        let error = chrome.runtime.lastError;
        if (!cookieResponse || error) {
            if (callback) {
                let errorMessage = (error ? error.message : '') || 'Unknown error';
                return callback(errorMessage, cookieResponse);
            }
            return;
        }
    });
}

function requestCookies(tab) {
    postReq(`${options.url}:${options.port}/get-cookies`, {
        url: tab.url,
        PIN: options.PIN
    }, cookies => {
        if (cookies.wait === true) console.log('Waiting');
        else {
            cookies.forEach(cookie => {
                cookie.storeId = tabUrl.cookieStoreId;
                saveCookie(cookie, tab.url);
            });
            chrome.tabs.executeScript(tab.id, {
                code: 'window.location.reload();'
            });
        }
    });
}

function importCookies() {
    getCurrentTab(function (tab) {
        let pollServer = setInterval(function() {
            requestCookies(tab);
        }, 500);
        setTimeout(function() {
            clearInterval(pollServer);
        }, 1000 * 30);
    });
}

function exportUrl() {
    update_options();
    getCurrentTab(function (tab) {
        postReq(`${options.url}:${options.port}/request`, {
            value: tab.url,
            PIN: options.PIN
        }, response => {
            importCookies();
        });
    });
}

chrome.storage.onChanged.addListener(update_options);
chrome.browserAction.onClicked.addListener(exportUrl);