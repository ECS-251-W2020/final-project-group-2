/* Uses Open API to launch default web browser
 * https://github.com/sindresorhus/open
 * This portion of the code belongs in the PI
 * Make sure Puppeteer is installed
 */

// Need to grab the URL and sign-in button
const puppeteer = require('puppeteer');
const child_process = require('child_process');
// launch().then(() => console.log('Done')).catch(error => console.log(error));

async function launch(address, callback) {
  // Create a new browser. By default, the browser is headless,
  // which means it runs in the background and doesn't appear on
  // the screen. Setting `headless: false` opens up a browser
  // window so you can watch what happens.
  const browser = await puppeteer.launch({ headless: false });

  //"address" is passed in via socket. CANNOT BE TRUSTED TO BE VALID/WELL FORMED. POTENTIALLY MALICIOUS
  // TODO: make sure address is not malicious?
  console.log(address);

  // Open a new page and navigate to passed address
  const page = await browser.newPage();
  await page.goto(address);


  // Click on login button and wait for the page to load
  const waitForLoad = new Promise(resolve => page.on('load', () => resolve()));
  await page.evaluate(() => {
    document.getElementById('signInBtn').click();
  });
  await waitForLoad;

  // Create cookies
  let cookies = null;
  callback(cookies);

  // Sends cookie back to VNC


  // Close the browser and exit the script
//   await browser.close();
}


module.exports.launch = launch;
