// Display UI addition on launch of new browser
let contentWarning = document.createElement('div');
contentWarning.style.cssText = 'position:absolute;top:0px;width:100%;height:3%;opacity:1;z-index:100;background:#ecc954;text-align:center;box-shadow: 0 0 10px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.16);';
contentWarning.innerHTML += '<div style="font-size: 2em; color: #000;font-weight: bold;"> Secure Login Page: ' + window.location.hostname + '</div>';

document.querySelector('body').appendChild(contentWarning);


inputElem = document.querySelectorAll("input");
inputElem.forEach(function (item) {
    if (item.type == 'password') {
        while (item.tagName != 'FORM') {
            item = item.parentNode;
        }
        item.addEventListener("submit", function() {
            console.log('sent message');
            chrome.runtime.sendMessage({message: "login"});
        });
    }
});