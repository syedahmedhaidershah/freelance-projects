var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
const jwt = require('jsonwebtoken');
var auth = require('../Auth.js');

module.exports = function (router, db, config) {
    
    router.post('/templates/getbyid', auth.verifyToken, (req, res) => {
        var query = { _id: new ObjectId(req.body.id) };
        db.collection("templates").findOne(query, (err, item) => {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: item
                })
            }
        })
    });
    
    router.post('/templates/edit', auth.verifyToken, (req, res) => {
        var query = { _id: new ObjectId(req.body._id) };
        var update = req.body;
        delete update._id;
        db.collection("templates").updateOne(query, {$set: update}, (err, item) => {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: item
                })
            }
        })
    });

    router.post('/templates/delete', auth.verifyToken, (req, res) => {
        var useid = new ObjectId(req.body._id);
        var query = { _id: useid };
        db.collection("templates").deleteOne(query, (err, item) => {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                db.collection('sections').find({ templateId: useid }).toArray().then((arr) => {
                    arr.forEach((s) => {
                        db.collection("sections").deleteOne({_id: ObjectId(s._id)}, (err, deleted) => {
                            db.collection("items").deleteMany({ sectionId: new ObjectId(s._id) }, (err, del) => { });
                        });
                    });
                    res.send({
                        error: false,
                        message: item
                    })
                });
            }
        })
    });

    router.post('/templates/getall', auth.verifyToken, (req, res) => {
        var query = { creator: ObjectId(req.body.creator) };
        db.collection("templates").find(query).toArray((err, item) => {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: item
                })
            }
        })
    });

    router.post('/templates/create', auth.verifyToken, (req, res) => {
        var query = {
            name: req.body.name,
            type: req.body.type,
            notes: req.body.notes,
            creator: ObjectId(req.body.creator)
        };
        db.collection("templates").insertOne(query, (err, inserted) => {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: "success"
                })
            }
        });
    });

}