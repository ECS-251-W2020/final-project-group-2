const child_process = require('child_process');

function launch(address, callback) {
    //Write code for launching chrome here
    //"address" is passed in via socket. CANNOT BE TRUSTED TO BE VALID/WELL FORMED. POTENTIALLY MALICIOUS
    console.log(address);
    let cookies = null;
    callback(cookies);
}


module.exports.launch = launch;