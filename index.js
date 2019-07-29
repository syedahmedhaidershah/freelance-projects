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

//const { Worker, isMainThread, parentPort } = require('worker_threads');
//const worker = new Worker('./worker.js');

global.sps = [];
global.saved = [];

//const raspi = require('raspi');
//const gpio = require('raspi-gpio');
 
//raspi.init(() => {
//  const input = new gpio.DigitalInput({
//    pin: 'GPIO17',
//    pullResistor: gpio.PULL_DOWN
//  });
//   const input2 = new gpio.DigitalInput({
//    pin: 'GPIO4',
//    pullResistor: gpio.PULL_DOWN
//  });
// 	setInterval(() => {
//        	if(input && input2) {
//   	             if(input.read() && input2.read()) {
//                        	//console.log("triggered");
//                	        runApp().then(() => {
//        	                        fs.readFile('still-image.jpg', (err, dat) => {
// 	                                       if(err) return console.log(err);
//                                        	io.emit('image',dat);
//                                	});
//                        	});
//                	}
//                	console.log('checking');
//        	}
//	}, 100);

//});

// Take still image and save to disk
global.runApp = async () => { 
    const stillCamera = new StillCamera();
    const image = await stillCamera.takeImage();
    fs.writeFileSync("still-image.jpg", image);
};

socketHandler = require('./socket')(ioHost);

ioHost.listen(socketPort, () => {
    console.log(`Socket is live on port ${socketPort}`);
});

global.io = client.connect(config.uri);
console.log(`connecting to ${config.uri}`);

const ioInter = setInterval(() => { 
	if(global.io.connected) {
		console.log(`connected to ${config.uri}`);
		clearInterval(ioInter);
	} 
}, 1000);

//require('./workerHandler')(worker);

//setInterval(() => {
//	if(input && input2) {
//		if(input.read() && input2.read()) {
//			//console.log("triggered");
//			runApp().then(() => {
//				fs.readFile('still-image.jpg', (err, dat) => {
//					if(err) return console.log(err);
//					io.emit('image',dat);
//				});
//			});
//		}
//		console.log('checking');
//	}
//});
