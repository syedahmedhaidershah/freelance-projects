// requiring app (Express instance)
const app = require('./app');

// creating a http-server instance to be used in WebSocket (socket.io)
const http = require('http').createServer(app);
// creating a socket.io websocket server using http
const io = require('socket.io')(http);
// requiring custom default functions
const defs = require('./imports/defs');

defs.setGlobals();
defs.initWorkers();

const dbConf = require('./imports/config/db').mongo;
const mongoClient = require('mongodb').MongoClient;

const appPort = 9899;
const ioPort = 9898;

mongoClient.connect(dbConf.uri, {useNewUrlParser: true}, (err, result) => {
    if(err) {
        console.log('DB Not initialized');
        console.log(err);
    } else {
        if(env.environment.dev) console.log('db initialized');
        db = result.db(dbConf.database);
        defs.requireAll('modules', app, io);
        // app.all('*', (req,res) => res.send(`Unknown route - ${req.url}`));
    }
});


io.listen(ioPort, () => {
    if(env.environment.dev) console.log(`listening on *:${ioPort}`);
});
app.listen(appPort, () => {
    if(env.environment.dev) console.log(`live on *:${appPort}`);
});
