console.log("HI!");
var nativePort = chrome.runtime.connectNative("com.google.chrome.fidelius.echo");
var numEMs = 0;
nativePort.postMessage("2" + '\n' + "origin" + '\n');
console.log(chrome.tabs.Tab);

var getKeys = function(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
}


function appendMessage(text) {
  document.getElementById('response').innerHTML += "<p>" + text + "</p>";
}

function updateUiState() {
  if (port) {
    document.getElementById('connect-button').style.display = 'none';
    document.getElementById('input-text').style.display = 'block';
    document.getElementById('send-message-button').style.display = 'block';
  } else {
    document.getElementById('connect-button').style.display = 'block';
    document.getElementById('input-text').style.display = 'none';
    document.getElementById('send-message-button').style.display = 'none';
  }
}

function sendNativeMessage() {
  message = {
    "text": document.getElementById('input-text').value
  };
  port.postMessage(message);
  appendMessage("Sent message: <b>" + JSON.stringify(message) + "</b>");
}

function onNativeMessage(message) {
  appendMessage("Received message: <b>" + JSON.stringify(message) + "</b>");
}

function onDisconnected() {
  appendMessage("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
  updateUiState();
}

function connect() {
  var hostName = "com.google.chrome.example.echo";
  appendMessage("Connecting to native messaging host <b>" + hostName + "</b>")
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
  updateUiState();
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('connect-button').addEventListener(
    'click', connect);
  document.getElementById('send-message-button').addEventListener(
    'click', sendNativeMessage);
  updateUiState();
});


//
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('in here');
  console.log("HI THIS IS WORKIGN???");
  nativePort.postMessage("6" + '\n' + "origin" + '\n');
  if (changeInfo.status == "complete" && tab.active) {
    chrome.tabs.executeScript(null, {
      file: "syntaxChecker.js"
    });

    chrome.runtime.onMessage.addListener(function(msg) {

      nativePort.postMessage("6" + '\n' + "origin" + '\n');
      if (msg == "false") {
        return;
      } else if (numEMs >= 1) {
        //alert('we cannot handle concurrent web enclaves');
      } else {
        start();
        numEMs++;
      }
    });
  }
});

function start() {
  /* Wait for message from HTMLParser. When a message is received, relay it to the
   * enclave manager via NativeMessaging
   */
  chrome.runtime.onConnect.addListener(function(parserPort) {
    parserPort.onMessage.addListener(function(msg) {
      console.log(msg);
      nativePort.postMessage(msg);
    });

    nativePort.onMessage.addListener(function(msg) {
      //alert("hi2");
      console.log(msg);
      parserPort.postMessage(JSON.stringify(msg));
    });

    nativePort.onDisconnect.addListener(function() {
      parserPort.postMessage("Disconnected");
    });
  });

  //chrome.tabs.executeScript(null, {file: "signature.js"});
  chrome.tabs.executeScript(null, {
    file: "htmlParser.js"
  });
}

//alert('down here');