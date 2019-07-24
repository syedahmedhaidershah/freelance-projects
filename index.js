const express = require('express');
const app = express();
const http = require('http');
const httpIns = http.createServer(app);
const fs = require('fs');
global.io = require('socket.io')(httpIns);
const mysql = require('mysql');
const dbConf = require('./imports/db').mysqlconn;
const cors = require('cors');
const { Worker, isMainThread, parentPort } = require('worker_threads');
const worker = new Worker('./worker.js');

global.connectedUsers = {};
global.alertsPending = [];
global.sps = [];
global.saved = [];
global.lastDoorNotif = {}
global.doorOut = null;

const db = mysql.createConnection(dbConf);
db.connect();

const bodyParser = require('body-parser');

const socketPort = 9897;
const appPort = 9896;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

fs.readdir('./routes', (e, f) => {
    if(e) return console.log(e);
    f.forEach(file => {
        if(file !== 'bluetooth.js') {
              require('./routes/'.concat(file))(app, db);    
        } else {
            // global.bluetoothHandler = require('./routes/'.concat(file));
        }
    });
});

socketHandler = require('./socket')(io, db);

io.listen(socketPort, () => {
    console.log(`Socket is live on port ${socketPort}`);
});
app.listen(appPort, () => {
    console.log(`App is live on port ${appPort}`);
});

// Listen for messages from the worker and print them.
require('./workerHandler')(worker);

//  fs.readFile('./bluetoothDevices.json', 'utf8', (err, buff) => {
//     if(err) {
//         console.log(err);
//         // io.emit("0", {message: "An error occured adding device with ID ".concat(data).concat(" to trusted devices")});
//     } else {
//         console.log('devices loaded');
//         const devs = JSON.parse(buff);
//         global.saved = devs.devices;
//     }
// });