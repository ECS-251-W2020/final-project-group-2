/* Opens a browser through command line
 */

const {spawn} = require('child_process');
address = 'https://www.google.com'

function launch(address, callback) {
    const child = spawn('chromium-browser ' + address, {
        stdio: 'inherit',
        shell: true
    });

    console.log(address);

    let cookies = null;
    callback(cookies);
}

module.exports.launch = launch;