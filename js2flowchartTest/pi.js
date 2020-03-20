const picam = require('pi-camera-connect');
const config = require('./imports/config');
const client = require('socket.io-client');
const StillCamera = require("pi-camera-connect").StillCamera;
const fs = require("fs");
const express = require('express');
const app = express();
const http = require('http');
const httpIns = http.createServer(app);
global.ioHost = require('socket.io')(httpIns);

const socketPort = 9897;

const { Worker, isMainThread, parentPort } = require('worker_threads');
const worker = new Worker('/home/pi/vidulum/worker.js');

global.sps = [];
global.saved = [];

global.runApp = async () => {
    const stillCamera = new StillCamera();
    const image = await stillCamera.takeImage();
    fs.writeFileSync("/home/pi/vidulum/still-image.jpg", image);
};

ioHost.on('connection', (sock) => {
    console.log('worker connected');
    sock.on('alert', (data) => {
        console.log('here');
        global.runApp().then(() => {
            fs.readFile('/home/pi/vidulum/still-image.jpg', (err, dat) => {
                if (err) return console.log(err);
                global.ioHost.emit('image', dat);
            });
        });

    });
});
ioHost.on('disconnect', (sock) => {
    console.log('worker disconnected');
});

ioHost.listen(socketPort, () => {
    console.log(`Socket is live on port ${socketPort}`);
});

global.io = client.connect(config.uri);
console.log(`connecting to ${config.uri}`);

const ioInter = setInterval(() => {
    if (global.io.connected) {
        console.log(`connected to ${config.uri}`);
        clearInterval(ioInter);
    }
}, 1000);

worker.on('message', (msg) => {
    if (msg.type == 'save') {
        global.sps = msg.message;
    } else if (msg.type == 'userpresent') {
        io.emit('userpresent', msg.message);
    }
});
worker.on('error', (err) => { throw err; });

global.io.on('alert', (data) => {
    //	console.log(data);
    global.runApp().then(() => {
        console.log('captured');
        fs.readFile('still-image.jpg', (err, dat) => {
            if (err) return console.log(err);
            global.io.emit('image', dat);
        });
    })
        .catch(exc => {
            console.log(exc)
        });;
});