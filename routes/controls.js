const queries = require('../queries').controls;
const md5= require('md5');
let lastTried = new Date().getTime();
const gpio = require('raspi-gpio');
const DOOR_UNLOCK_DURATION = 1000;

module.exports = function (app, db) {
    app.post('/passphrase', (req, res) => {
        const pass = md5(req.body.passphrase);

        const query = db.format(queries.passphrase, [pass]);

        db.query(query, (e,r,f) => {
            if(e) {
                console.log(e);
                res.send({error: true, message: 'An unhandled exception occured.'});
            } else if(r.length === 0) {
                const useMessage = 'Incorrect passphrase entered. Everyone has been sent an alert.';
                res.send({error: true, message: useMessage});
                db.query(query, (e, r, f) => {
                    if (e) {
                        console.log(e);
                    }
                    res.send(200);
                });
                const now = new Date().getTime();
                if(now - lastTried < 15000) {
                    io.emit("0", { message: 'An Incorrect passphrase has been entered twice within 15 seconds'});
                }
                lastTried = now;
            } else {
                res.send({error: true, message: 'Welcome'});
                mainGate.writeSync(true);
                setTimeout(() => {
                    mainGate.writeSync(false);
                }, 500);
            }
        });
    });

    app.post('/fingerprint/message', (req, res) => {
        if(req.body.message == 'unlockdoor') {
            global.doorOut.write(gpio.LOW);
            
            // mainGate.write(false, (err) => `ERRORR I/O: ${err}`);
            setTimeout(() => {
              global.doorOut.write(gpio.HIGH);
                
            //    mainGate.write(true, (err) => `ERRORR I/O: ${err}`); 
            }, DOOR_UNLOCK_DURATION);
        }
        res.sendStatus(200);
    })
}
