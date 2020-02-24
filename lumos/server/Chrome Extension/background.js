'use strict;'
function exportCookies() {
    chrome.tabs.executeScript({
        code: 'performance.getEntriesByType("resource").map(e => e.name)',
      }, data => {
        if (chrome.runtime.lastError || !data || !data[0]) return;
        const urls = data[0].map(url => url.split(/[#?]/)[0]);
        const uniqueUrls = [...new Set(urls).values()].filter(Boolean);
        Promise.all(
          uniqueUrls.map(url =>
            new Promise(resolve => {
              chrome.cookies.getAll({url}, resolve);
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
          console.log(cookies);
          const xhr = new XMLHttpRequest();
          const url = 'http://localhost:5800/cookies'
          xhr.open('POST', url, true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(cookies));
        });
      });
}

chrome.browserAction.onClicked.addListener(exportCookies);