var currentTab;

/*
 * Add or remove the bookmark on the current page.
 */
function exportCookies() {
    let domain = currentTab.url;
    chrome.cookies.getAll({
        domain: domain,
    }, function(cookies){
        console.log(cookies);
    });
}

chrome.browserAction.onClicked.addListener(exportCookies);

/*
 * Switches currentTab and currentBookmark to reflect the currently active tab
 */
function updateActiveTab(tabs) {
  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
    }
  }
  var gettingActiveTab = chrome.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
}

// listen to tab URL changes
chrome.tabs.onUpdated.addListener(updateActiveTab);

// listen to tab switching
chrome.tabs.onActivated.addListener(updateActiveTab);

// listen for window switching
chrome.windows.onFocusChanged.addListener(updateActiveTab);

// update when the extension loads initially
updateActiveTab();