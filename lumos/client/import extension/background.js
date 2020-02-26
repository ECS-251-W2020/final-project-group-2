'use strict;'

const url = 'http://localhost:5800/get-cookies';

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

let saveCookie = function (cookie, url) {
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

function importCookies() {
    getCurrentTab(function (tab) {
        postReq(url, {
            url: tab.url
        }, function (cookies) {
            if (cookies.wait === true);
            else {
                cookies.forEach(cookie => {
                    // Make sure we are using the right store ID. This is in case we are importing from a basic store ID and the
                    // current user is using custom containers
                    // cookie.storeId = tabUrl.cookieStoreId;

                    saveCookie(cookie, tab.url);
                });
                chrome.tabs.executeScript(tab.id, {code: 'window.location.reload();'});
            }
        });
    });
}

chrome.browserAction.onClicked.addListener(importCookies);