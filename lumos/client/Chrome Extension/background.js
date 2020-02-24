'use strict;'

function exportCookies() {
  const xhr = new XMLHttpRequest();
  const url = 'http://localhost:5800/request'
  xhr.open('POST', url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  let currentTab;
  
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
      xhr.send(JSON.stringify({
        value: currentTab.url
    }));
    }
  });


  xhr.onload = function() {
  }
}

chrome.browserAction.onClicked.addListener(exportCookies);