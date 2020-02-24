'use strict;'

function exportCookies() {
  const socket = io.connect('http://localhost:5800')
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs[0]) {
      socket.emit('click', tabs[0].url);
      console.log(tabs[0].url);
    }
  });
  socket.on('import-cookies', function(cookies) {
    
  })
}

chrome.browserAction.onClicked.addListener(exportCookies);