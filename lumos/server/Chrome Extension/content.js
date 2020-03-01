// Display UI addition on launch of new browser
let contentWarning = document.createElement('div');
contentWarning.style.cssText = 'position:absolute;top:0px;width:100%;height:3%;opacity:1;z-index:100;background:#fd9ea9;text-align:center;border-bottom: 1px solid #cacad9;box-shadow: 0 0 10px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.16);';
contentWarning.innerHTML += '<div style="text-size: 2em; color: #fff;font-weight: bold;"> Secure Login Page </div>';

document.querySelector('body').appendChild(contentWarning);