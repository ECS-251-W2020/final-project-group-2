<h1>ReadMe</h1>

The Lumos Project is divided into 2 parts:
<ul>
<li>Server</li>
<li>Client</li>
</ul>

The Server components (in the server folder) are to be install on the Thin Client, while the Client components (in the client folder) are to be installed on the Host. (Terms thin client and host as described in the PPT). The server components are made up of a Chrome Extension and a Nodejs server for responding to requests made by the Chrome extensions. The client only has one component, another Chrome Extension.

To install the Chrome extensions:
<ol>
<li>Go to "about:extensions" in Chrome</li>
<li>Turn on Developer Mode (switch at the top right)</li>
<li>Click the "Load Unpacked" button and select the "Chrome Extension" folder for client or server respectively</li>
</ol>

Chrome extension configuration:<br>
On the host computer, right click on the Lumos icon and select "options". Enter the IP address of the Host computer. Make sure to use HTTP:// or HTTPS:// as configured in Lumos Server, as well as the correct PIN and ports.

Running Lumos Server:<br>
Navigate to lumos/server/Nodejs and follow the README.md file in that folder.

Additional 3rd Party software to be installed: <br>
Thin client:
<ul>
<li>Chrome</li>
<li>VNC Viewer</li>
</ul>
Host:
<ul>
<li>Chrome</li>
<li>VNC Server</li>
</ul>

Once all components have been installed, simply run Lumos Server on the thin client and VNC into the host computer.
