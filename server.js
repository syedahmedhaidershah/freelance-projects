const express = require('express');
const MongoDB = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/default');
const port = 9999;
const router = express.Router();
const ioPort = 9898;
const server = require('http').Server(app);
const io = require('socket.io')(server);

var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' });

app.use(jsonParser);
app.use(urlencodedParser);
app.use('/api', router);

MongoDB.MongoClient.connect(config.dburl, { useNewUrlParser: true }, (err, database) => {
    if (err) {
        console.log(err)
    }
    else {
        database = database.db('inspectofy');

        // Router Instances
        const inspectorRouter = require('./routes/inspectorRouter')(router, database, config);
        const contactRouter = require('./routes/contactRouter')(router, database, config);
        const templatesRouter = require('./routes/templatesRouter')(router, database, config);
        const sectionsRouter = require('./routes/sectionsRouter')(router, database, config);
        const itemsRouter = require('./routes/itemsRouter')(router, database, config);
        const commentsRouter = require('./routes/commentsRouter')(router, database, config);
        const inspectionsRouter = require('./routes/inspectionsRouter')(router, database, config);
        const clientsRouter = require('./routes/clientsRouter')(router, database, config);
        const metricsRouter = require('./routes/metricsRouter')(router, database, config);
        //////////////////////////////////////////////////////////////////////////////////////
        const appSocket = require("./socket/templatesComponent")(io, database, config);
        //////////////////////////////////////////////////////////////////////////////////////
        server.listen(ioPort, () => {
            console.log(`Socket is live on ${port}`);
        });
        app.listen(port, () => {
            console.log('API is live on ' + port);
        });
    }
})