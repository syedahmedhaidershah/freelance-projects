const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const md5 = require('md5');
var db = null;
var changeStream = null;

module.exports = function(io, dbconfig) {
    mongoClient.connect(dbconfig.url, { useNewUrlParser: true }, (err, database) => {
        if (err) {
            console.log("Database is inaccessible. Check your network or DB - Instance.\nIf everything is correct, type \"rs\" and press ENTER");
            process.exit();
            return false;
        } else {
            db = database.db(dbconfig.name);
            const notificationsCollection = db.collection('notifications');
            const carouselsCollection = db.collection('carousels');
            nChangeStream = notificationsCollection.watch();
            cChangeStream = carouselsCollection.watch();
            nChangeStream.on('change', (change) => {
                console.log(change);
                io.emit("message", {
                    changed: 'notification',
                    doc: change.fullDocument,
                    op: change.operationType,
                    key: change.documentKey,
                    update: change.updateDescription
                });
            });
            cChangeStream.on('change', (change) => {
                console.log(change);
                io.emit("message", {
                    changed: 'carousel',
                    doc: change.fullDocument,
                    op: change.operationType,
                    key: change.documentKey,
                    update: change.updateDescription
                });
            });
        }
    });
    io.on('connection', (socket) => {
        console.log("User connected");
    });
}