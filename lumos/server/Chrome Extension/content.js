// Display UI addition on launch of new browser
let contentWarning = document.createElement('div');
contentWarning.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000';
contentWarning.innerHTML += '<h2> Secure Login Page </h2>';

document.querySelector('body').appendChild(contentWarning);