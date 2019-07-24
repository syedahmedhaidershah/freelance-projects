const queries = require('../queries').user;
const md5= require('md5');

module.exports = function (app, db) {
    app.post('/login', (req, res) => {
       // console.log(req.body);
        const username = req.body.username;
        const password = md5(req.body.password);

        const query = db.format(
            queries.login, [username, password]
        );

        db.query(query, (e, r, f) => {
            if (e) {
                console.log(e);
                res.send({ error: true, message: 'An unhandled exception occured.' });
            } else if (r.length === 0) {
                res.send({ error: true, message: 'Invalid credentials provided.' });
            } else {
                const user = r[0];
                delete user.password;
                
                console.log(user);
                res.send({ error: false, message: user });
            }
        });
    });

    app.post('/alert', (req, res) => {
        const uid = req.body.uid;
        const d = new Date();
        const useMessage = {
            text: 'Somebody is at the door for you, '.concat(req.body.username),
            timestamp: d.getTime()
        };
        global.alertsPending.push({
            uid: uid,
            useMessage: useMessage,
            timestamp: d.getTime()
        });

        const query = db.format(
            queries.alert, [uid, useMessage]
        );

        db.query(query, (e, r, f) => {
            if (e) {
                console.log(e);
            }
            res.send(200);
        });

        io.emit(uid, { message: useMessage});
    });

    app.post('/received', (req,res) => {
        const timestamp = req.timestamp;
        global.alertsPending = global.alertsPending.filter(a => {
            if(a.timestamp !== timestamp) {
                return a;
            }
        });
    });
}