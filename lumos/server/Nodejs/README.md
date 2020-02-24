Steps to get Lumos Server running

1. Run `npm install`
2. Run `npm install -g nodemon`
3. Rename `nodemon.json~` to `nodemon.json` and update variables
4. If running Linux, go into `node_modules/chrome-launcher/dist/chrome-launcher.js` and search for `--disable-setuid-sandbox`. Remove the section setting this flag.
5. Run `npm test`