const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const md5 = require('md5');
var db = null;
var changeStream = null;

module.exports = function (io, db, config) {
    const templatesCollection = db.collection('templates');
    const sectionsCollection = db.collection('sections');
    const itemsCollection = db.collection('items');
    const commentsCollection = db.collection('comments');
    changeStreamT = templatesCollection.watch();
    changeStreamS = sectionsCollection.watch();
    changeStreamI = itemsCollection.watch();
    changeStreamC = commentsCollection.watch();
    changeStreamT.on('change', (change) => {
        console.log(change);
        io.emit("message", {
            changed: 'template',
            doc: change.fullDocument,
            op: change.operationType,
            key: change.documentKey,
            update: change.updateDescription
        });
    });
    changeStreamS.on('change', (change) => {
        console.log(change);
        io.emit("message", {
            changed: 'section',
            doc: change.fullDocument,
            op: change.operationType,
            key: change.documentKey,
            update: change.updateDescription
        });
    });
    changeStreamI.on('change', (change) => {
        console.log(change);
        io.emit("message", {
            changed: 'item',
            doc: change.fullDocument,
            op: change.operationType,
            key: change.documentKey,
            update: change.updateDescription
        });
    });
    changeStreamC.on('change', (change) => {
        console.log(change);
        io.emit("message", {
            changed: 'comment',
            doc: change.fullDocument,
            op: change.operationType,
            key: change.documentKey,
            update: change.updateDescription
        });
    });
    io.on('connection', (socket) => {
        console.log("User connected");
    });
}