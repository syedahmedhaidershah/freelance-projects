// const mVperAmp = 100; // use 100 for 20A Module and 66 for 30A Module
// const ACSoffset = 2500;
const moment = require('moment');
const ObjectId = require('mongodb').ObjectID;

let prevV = 0;

global.ampsArr = [];
global.voltsArr = [];


function isJson(str) {
    try {
        if (typeof (str) == 'object') {
            return true;

        }
    } catch (ex) {
        return false;
    }
}

module.exports = function (app, db) {
    app.post('/powercalculation', (req, res) => {
        if (isJson(req.body)) {
            let amps = req.body.amps;
            // Voltage = (amps / 1024.0) * 5000; // Gets you mV
            // amps = ((Voltage - ACSoffset) / mVperAmp);
            amps = ((amps - 512) / 1024 * 5 / 100000 * 1000000) / Math.sqrt(2);
            req.body.volts *= 0.304177;

            console.log(req.body.volts);
            
            if (req.body.volts > 5) {
                prevV = Math.abs(req.body.volts);
                if (global.voltsArr.length < 10) {
                    global.voltsArr.push(prevV);
                } else {
                    voltsShow = (global.voltsArr.reduce((a, b) => { return a + b; }, 0)) / 10;
                    global.voltsArr = [];
                    global.voltsArr.push(prevV);
                    global.volts = voltsShow;
                    let d = new Date();
                    const voltageEntry = {
                        _id : new ObjectId(),
                        voltage: global.volts,
                        unixtime: d.getTime(),
                        date: d.toISOString().split('T')[0],
                        time: moment(d).toString().split(' ')[4]
                    };
                    db.collection('voltages').insertOne(voltageEntry, (err, obj) => {
                        if(err) { console.log(err); }
                        else {
                        }
                    });
                }
            } else {
                if (global.voltsArr.length < 10) {
                    global.voltsArr.push(0);
                } else {
                    voltsShow = (global.voltsArr.reduce((a, b) => { return a + b; }, 0)) / 10;
                    global.voltsArr = [];
                    global.voltsArr.push(0);
                    global.volts = voltsShow;
                    let d = new Date();
                    const voltageEntry = {
                        _id: new ObjectId(),
                        voltage: global.volts,
                        unixtime: d.getTime(),
                        date: d.toISOString().split('T')[0],
                        time: moment(d).toString().split(' ')[4]
                    };
                    db.collection('voltages').insertOne(voltageEntry, (err, obj) => {
                        if (err) { console.log(err); }
                        else {
                            console.log(obj);
                        }
                    });
                }
            }

            if (global.ampsArr.length < 10) {
                global.ampsArr.push(amps);
            } else {
                let ampsShow = (global.ampsArr.reduce((a, b) => { return a + b; }, 0)) / 10;
                global.ampsArr = [];
                global.ampsArr.push(amps);
                global.amps = ampsShow;
                let d = new Date();
                const ampereEntry = {
                    _id: new ObjectId(),
                    ampere: global.amps,
                    unixtime: d.getTime(),
                    date: d.toISOString().split('T')[0],
                    time: moment(d).toString().split(' ')[4]
                };
                db.collection('amperes').insertOne(ampereEntry, (err, obj) => {
                    if (err) { console.log(err); }
                    else {
                    }
                });
            }

        } else {
            console.log('not json body');
        }

        res.sendStatus(200);
    });

    app.post('/get/voltage/recent/', (req, res) => {
        const limit = req.body.limit;
        db.collection('voltages').find({}).sort({unixtime: -1}).limit(limit).toArray().then((arr) => {
            res.send({
                error: false,
                message: arr
            })
        });
    });

    app.post('*', (req, res) => {
        res.send({
            error: false,
            message: 'OK'
        })
    });
}