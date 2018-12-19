const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const db = require('./config/db');
const MongoClient = require('mongodb').MongoClient;
const port = 9899;
const ioPort = 9898;
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
// app.use(function (err, req, res, next) {
//     ///
// });

global.volts = 0;
global.amps = 0;

MongoClient.connect(db.url, {useNewUrlParser: true}, (err, db) => {
    if(err) {
        console.log(err);
    } else {
        database = db.db('pluto_energy');
        require('./routes')(app, database);
        require("./socket")(io, database);
    }

});

server.listen(ioPort, () => {
    console.log(`Socket is live on ${ioPort}`);
});
app.listen(port, () => {
    console.log(`app is live on ${port}`);
});

