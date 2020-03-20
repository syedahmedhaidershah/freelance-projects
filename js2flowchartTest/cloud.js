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

let connectedUsers = 0;

let gb = null;

global.drive = null;
global.reading = 1024;
global.userpresent = false;

const defs = {
    errRes: {
        error: true,
        message: 'An unhandled exception occured'
    },
    def: {
        error: false,
        message: 'success'
    },
    msg: (str) => {
        const res = module.exports.def;
        res.message = str;
        return res;
    },
    err: (str) => {
        const res = module.exports.errRes;
        res.message = str;
        return res;
    }
};

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

//	io.on('disconnect', (sock) => {
//		if(gb) {
//			clearInterval(gb);
//		}
//	});

gb = setInterval(() => {
    io.emit("location", global.coords);
    console.log("broadcasting", global.coords);
}, 1500);

io.on('connection', (socket) => {
    connectedUsers++;

    //	gb = setInterval(() => {
    //		io.emit("location", global.coords);
    //		console.log("broadcasting", global.coords);
    //	}, 1500);

    console.log(`connected Users: ${connectedUsers}`);

    socket.on('disconnect', () => {
        connectedUsers--;
        console.log(`connected Users: ${connectedUsers}`);
    });

    socket.on('image', (data) => {
        // console.log(data);
        const folderId = '17_a6ALC6a2dVk06Dcgb_lwk_J-CEgoVg'
        fs.writeFileSync('./img/1.jpg', data);
        const fileMetadata = {
            'name': (new Date().toString()).concat('jpg'),
            parents: [folderId]
        };
        const media = {
            mimeType: 'image/jpeg',
            body: fs.createReadStream('./img/1.jpg')
        };
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }, function (err, file) {
            if (err) {
                // Handle error
                console.error(err);
            } else {
                console.log(file);
                console.log('File Id: ', file.id);
            }
        });
    });

    socket.on('userpresent', (data) => {
        global.userpresent = data;

        console.log(global.userpresent, global.reading);

        if (!(global.userpresent) && global.reading > 900) {
            console.log('alerted');
            io.emit('alert', {});
        }
    })
});

router.get('/halleffect', (req, res) => {
    // console.log(req.params);
    const q = req.query;
    global.reading = (q.reading) ? q.reading : 0;
    global.coords = (q.lat && q.lng) ? { lat: q.lat, lng: q.lng } : { lat: '24.941450', lng: '67.069405' };
    res.sendStatus(200);
});
router.get('/img', (req, res) => {
    res.sendFile('/home/ubuntu/vidulum/img/1.jpg');
});

router.get('/imgs', (req, resp) => {
    drive.files.list({
        pageSize: 20,
        fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
        if (err) { resp.send(err); return console.log('The API returned an error: ' + err); }
        let f = [];
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            f = files.map((file) => {
                return `${file.name} (${file.id})`;
            });
        } else {
            console.log('No files found.');
        }
        files.forEach(file => {
            //console.log(drive.files.get);
            const x = drive.files.get({
                fileId: file.id,
                alt: 'media'
            })
            //		.on('end', (r) => {console.log(r);})
            //		.on('error', err => {console.log(err);})
        });
        //.pipe((dat) => console.log(dat));
        console.log(x);
        resp.sendStatus(200);
    });
});


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