'use strict;'

function exportCookies() {
  const socket = io.connect('http://localhost:5800')

  let currentTab;

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
      socket.emit('click', currentTab.url);
      console.log(tabs[0].url);
    }
  });
  socket.on('import-cookies', function (cookies) {
    try {
      cookies = JSON.parse(json);
    } catch (error) {
      socket.emit('errorlog', 'client: ' + error);
    }
    cookies.forEach(cookie => {
      // Make sure we are using the right store ID. This is in case we are importing from a basic store ID and the
      // current user is using custom containers
      cookie.storeId = currentTab.cookieStoreId;

      saveCookie(cookie, currentTab.url, function (error, cookie) {
        if (error) {
          sendNotification(error);
        }
      });
    });

    let saveCookie = function (cookie, url, callback) {
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
  
        if (callback) {
          return callback(null, cookieResponse);
        }
      });
    }
  });
}

chrome.browserAction.onClicked.addListener(exportCookies);