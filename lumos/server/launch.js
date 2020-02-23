const child_process = require('child_process');

function launch(address) {
    //Write code for launching chrome here
    //"address" is passed in via socket. CANNOT BE TRUSTED TO BE VALID/WELL FORMED. POTENTIALLY MALICIOUS
    console.log(address)
}


module.exports.launch = launch;