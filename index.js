const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./injects/db');
const port = 9899;
const router = express.Router();
const ioPort = 9898;
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));
app.use('/api', router);
router.use(cors());

const appRoutes = require("./api/routes")(router, db, __dirname);
const appSocket = require("./api/socket")(io, db);

server.listen(ioPort, () => {
    console.log(`Socket is live on ${9898}`);
});

app.listen(port, () => {
    console.log(`API is live on ${port}`);
})