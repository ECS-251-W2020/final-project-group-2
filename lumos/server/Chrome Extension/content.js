// Display UI addition on launch of new browser
let contentWarning = document.createElement('div');
contentWarning.style.cssText = 'position:absolute;top:0px;width:100%;height:3%;opacity:0.8;z-index:100;background:#000;text-align:center';
contentWarning.innerHTML += '<div style="text-size: 2em; color: #fff;"> Secure Login Page </div>';

document.querySelector('body').appendChild(contentWarning);