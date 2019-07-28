const express = require('express');
const app = express();
const http = require('http').createServer(app);
var io = require('socket.io')(http);
const bp = require('body-parser');
const cors = require('cors');
const router = express.Router();
const process = require('process');

const defs = require('./imports/defs');

app.use(bp.json({ limit: '50mb' }));
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);

const ioPort =  process.env.PORT || 9898;
const appPort = process.env.PORT || 9899;

require('./imports/socket')(io);
require('./imports/router')(router);

app.all('*', (req, res) => res.send(defs.errRes));
router.all('*', (req, res) => res.send(defs.errRes));

http.listen(ioPort, function() {
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