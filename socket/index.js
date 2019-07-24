const qs = require('../queries.js');
const ioclient = require('socket.io-client');
const fs = require('fs');
// const dd = require('onoff').Gpio;
// const process = require('process');
// const mainGate = new dd(4, 'out');
const raspi = require('raspi');
const gpio = require('raspi-gpio');
const DOOR_UNLOCK_DURATION = 1000;
// mainGate.write(true, (err) => console.log(err));

raspi.init(() => {
    global.doorOut = new gpio.DigitalOutput('GPIO17');
    global.doorOut.write(gpio.HIGH);
    // global.doorOut.destroy();
});

module.exports = function(io, db) {
    // setInterval(() => {
    //     console.log(global.sps);
    // });
    io.on('connection', (sock) => {
        console.log('user connected '.concat(new Date().toString()));
        sock.on('register', (data) => {
            global.connectedUsers[data.uid] = data;
            global.alertsPending.forEach(a => {
            	if(a.uid == data.uid) {
			        const useMessage = {
			            text: 'Somebody was at the door for you, '.concat(data.username),
			            timestamp: d.getTime()
			        };

					io.emit(uid, { message: useMessage});
            	}
            });
        });
        sock.on('nayagatepass', data => {
            const query = db.format(qs.controls.changeGatePass, [data]);

            db.query(query, (e,r,f) => {
                if(e) {
                    console.log(e);
                    io.emit("0", {message: 'An error occured updating gate pass'});
                } else {
                    // console.log('here', data);
                    io.emit("0", {message: 'The gate password has been changed to '.concat(data)});
                }
            });
        });
        sock.on('addbluetoothaddr', (data) => {
            // console.log(data);
            fs.readFile('./bluetoothDevices.json', 'utf8', (err, buff) => {
                if(err) {
                    console.log(err);
                    io.emit("0", {message: "An error occured adding device with ID ".concat(data).concat(" to trusted devices")});
                } else {
                    data.bluetoothaddress = data.bluetoothaddress.toUpperCase();
                    const devs = JSON.parse(buff);
                    if(!(devs.devices.hasOwnProperty(data.bluetoothaddress))) {
                        devs.devices[data.bluetoothaddress] = data;
                        fs.writeFile('./bluetoothDevices.json', JSON.stringify(devs), 'utf8', (e) => {
                            if (e) {
                                console.log(err);
                                io.emit("0", {message: "An error occured adding device with ID ".concat(data).concat(" to trusted devices")});
                            }
                        });
                        global.saved = devs.devices;
                    }
                }
            });
        });
        sock.on('opengate', (data) => {
            // console.log(data);
            global.doorOut.write(gpio.LOW);
            
            // mainGate.write(false, (err) => `ERRORR I/O: ${err}`);
            setTimeout(() => {
              global.doorOut.write(gpio.HIGH);
                
            //    mainGate.write(true, (err) => `ERRORR I/O: ${err}`); 
            }, DOOR_UNLOCK_DURATION);
        });
    });
    // io.on('disconnect', (sock) => {
        // console.log('user disconnected '.concat(new Date().toString()));
    // });
}


// process.on('SIGINT', () => {
//     mainGate.unexport();
// });