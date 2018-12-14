var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
const jwt = require('jsonwebtoken');
var auth = require('../Auth.js');

module.exports = function (router, db, config) {

    router.post('/comments/getbyid', auth.verifyToken, (req, res) => {
        var query = { _id: ObjectId(req.body.id) };
        db.collection("comments").findOne(query, (err, item) => {
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

    router.post('/comments/getall', auth.verifyToken, (req, res) => {
        var query = { creator: ObjectId(req.body.creator) };
        db.collection("comments").find(query).toArray((err, item) => {
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

    router.post('/comments/create', auth.verifyToken, (req, res) => {
        req.body.creator = ObjectId(req.body.creator);
        req.body.itemId = ObjectId(req.body.itemId);
        db.collection("comments").insertOne(req.body, (err, inserted) => {
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

    router.post('/comments/edit', auth.verifyToken, (req, res) => {
        query = {_id: ObjectId(req.body._id)};
        delete req.body._id;
        db.collection("comments").updateOne(query, {$set: req.body}, (err, inserted) => {
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

    router.post('/comments/delete', auth.verifyToken, (req, res) => {
        var query = { _id: ObjectId(req.body.id) };
        db.collection("comments").deleteOne(query, (err, deleted) => {
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