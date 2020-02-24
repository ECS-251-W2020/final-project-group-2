'use strict;'
function exportCookies() {
    const socket = io.connect('http://localhost:5800')
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     if (tabs[0]) {
    //         console.log(tabs[0].url);
    //         chrome.cookies.getAll({
    //             domain: tabs[0].url,
    //         }, function(cookies){
    //             console.log(cookies);
    //         });
    //     }
    // });

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
          socket.emit('export-cookies', cookies);
        });
      });
}

chrome.browserAction.onClicked.addListener(exportCookies);