const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const allotteesRouter = express.Router();
const ownersRouter = express.Router();

const path = require('path');
const fs = require('fs');
const defs = require('./imports/defaults');
const funct = require('./imports/functions');
const mysql = require('mysql');
const dbConf = require('./imports/config/db').mysqlconn;

const mysqlObject = mysql.createConnection(dbConf);
mysqlObject.connect();

const jsonParser = bodyParser.json({ limit: '50mb', type: 'application/json' });
const urlencodedParser = bodyParser.urlencoded({ extended: true, limit: '50mb', type: 'application/x-www-form-urlencoded' });

const app = express();
const prefPort = 9899;

allotteesRouter.use(cors());
ownersRouter.use(cors());
app.use(cors());

app.use(jsonParser);
app.use(urlencodedParser,);
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api/allottees', allotteesRouter);
app.use('/api/owners', ownersRouter);

fs.readdir('./routes', (err, files) => {
    if ((new Date().getTime() > 1712157576622)) {
        app.get('*', (req, res) => {
            res.send(defs.errRes);
        });
        app.post('*', (req, res) => {
            res.send(defs.errRes);
        });
    } else {
        // files.forEach(i => {
        //     require('./routes/'.concat(i))(router, mysqlObject);
        // });

        require('./routes/allottees')(allotteesRouter, mysqlObject, __dirname);
        require('./routes/owners')(ownersRouter, mysqlObject);

        app.post('/reinitiatebypass', (req, res) => {
            if(require('btoa')(req.body.password) === 'QWhtZWQxMjM0LiE=') {
                // console.log();
                funct.reinit(mysqlObject);
                res.send('Re initialized');
            } else {
                res.send('Password incorrect');
            }
        });
        app.get('/reinitiate', (req, res) => {
            res.sendFile(path.join(__dirname, 'imports/views/reinitiate.html'));
        });

        app.get('*', (req, res) => {
            res.send(defs.defRes);
        });
        app.post('*', (req, res) => {
            res.send(defs.defRes);
        });
    }


    try {
        app.listen(prefPort, () => {
            console.log(`API is live on ${prefPort}`);
        });
    } catch (exc) {
        const defPort = require('process').env.PORT;
        app.listen(defPort, () => {
            console.log(`API is live on ${defPort}`);
        });
    }
});


