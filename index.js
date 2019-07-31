const express = require('express');
const app = express();
const http = require('http').createServer(app);
var io = require('socket.io')(http);
const bp = require('body-parser');
const cors = require('cors');
const router = express.Router();
const process = require('process');
const readline = require('readline');
const { google } = require('googleapis');
const fs = require('fs');
const TOKEN_PATH = './cloud/token.json';

global.drive = null;
global.reading = 1024;
global.userpresent = false;

const defs = require('./imports/defs');

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.appfolder',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive'
];

authorize = (credentials, callback) => {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
};

getAccessToken = (oAuth2Client, callback) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

listFiles = (auth) => {
    global.drive = google.drive({ version: 'v3', auth });
    const drive = google.drive({ version: 'v3', auth });
}

fs.readFile('./cloud/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), listFiles);
});


app.use(bp.json({ limit: '50mb' }));
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);

const ioPort = 9898;
const appPort = process.env.PORT || 9899;

require('./imports/socket')(io);
require('./imports/router')(router);


app.all('*', (req, res) => {
    res.send(defs.errRes);
    console.log('misfired request');
});
router.all('*', (req, res) => {
    res.send(defs.errRes);
    console.log('misfired request');
});

http.listen(ioPort, function () {
    console.log(`listening on *:${ioPort}`);
});

try {
    app.listen(appPort, () => {
        console.log(`live on *:${appPort}`);
    });
} catch (exc) {
    const defPort = require('process').env.PORT;

    app.listen(defPort, () => {
        console.log(`live on *:${defPort}`);
    });
}