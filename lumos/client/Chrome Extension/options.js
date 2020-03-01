function save_options() {
    let host = document.getElementById('hostadd').value;
    let port = document.getElementById('port').value;
    let PIN = document.getElementById('PIN').value;

    chrome.storage.local.set({
      host: host,
      port: port,
      PIN: PIN
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    chrome.storage.local.get({
        host: localhost,
        port: 5800,
        PIN: 1234
    }, function(items) {
      document.getElementById('hostadd').value = items.host;
      document.getElementById('port').value = items.port;
      document.getElementById('PIN').value = items.port;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);