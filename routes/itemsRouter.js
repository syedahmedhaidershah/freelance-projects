var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
const jwt = require('jsonwebtoken');
var auth = require('../Auth.js');

module.exports = function (router, db, config) {

    router.post('/items/getall', auth.verifyToken, (req, res) => {
        var query = { creator: ObjectId(req.body.creator) };
        db.collection("items").find(query).toArray((err, item) => {
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

    router.post('/items/getbyid', auth.verifyToken, (req, res) => {
        query = {_id : ObjectId(req.body.id)};
        db.collection("items").findOne(query, (err, item) => {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: item
                });
            }
        });
    });


    router.post('/items/create', auth.verifyToken, (req, res) => {
        const temp = ObjectId(req.body.sectionName);
        db.collection("sections").findOne({ _id: temp }, (err, found) => {
            req.body.sectionName = found.sectionName;
            req.body.sectionId = temp;
            req.body.creator = ObjectId(req.body.creator);
            db.collection("items").insertOne(req.body, (err, inserted) => {
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
    });

    router.post('/items/edit', auth.verifyToken, (req, res) => {
        var query = { _id: new ObjectId(req.body._id) };
        var update = req.body;
        delete update._id;
        db.collection("items").updateOne(query, { $set: update }, (err, item) => {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: item
                });
            }
        })
    });


    router.post('/items/delete', auth.verifyToken, (req, res) => {
        var useid = new ObjectId(req.body._id);
        var query = { _id: useid };
        db.collection("comments").deleteMany({ itemId: i._id }, (err, obj) => { });
        db.collection("items").deleteOne(query, (err, item) => {
            res.send({
                error: false,
                message: item
            });
        })
    });

}