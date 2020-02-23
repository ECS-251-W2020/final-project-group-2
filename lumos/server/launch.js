/* Uses Open API to launch default web browser
 * https://github.com/sindresorhus/open
 * This portion of the code belongs in the PI
 * Make sure Puppeteer is installed
 */

const puppeteer = require('puppeteer');
run().then(() => console.log('Done')).catch(error => console.log(error));

async function run() {
  // Create a new browser. By default, the browser is headless,
  // which means it runs in the background and doesn't appear on
  // the screen. Setting `headless: false` opens up a browser
  // window so you can watch what happens.
  const browser = await puppeteer.launch({ headless: false });

  // Open a new page and navigate to google.com
  const page = await browser.newPage();
  await page.goto('https://google.com');

  // Wait 5 seconds
  await new Promise(resolve => setTimeout(resolve, 5000));




  // Close the browser and exit the script
//   await browser.close();
}