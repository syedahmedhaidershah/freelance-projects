var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
const jwt = require('jsonwebtoken');
var auth = require('../Auth.js');

module.exports = function (router, db, config) {

    router.post('/sections/getbyid', auth.verifyToken, (req, res) => {
        var query = { _id: new ObjectId(req.body.id) };
        db.collection("sections").findOne(query, (err, item) => {
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

    router.post('/sections/getbytemplate', auth.verifyToken, (req, res) => {
        var query = { templateId: new ObjectId(req.body.id) };
        db.collection("sections").find(query).toArray().then((arr) => {
            res.send({
                error: false,
                message: arr
            })
        })
    });

    router.post('/sections/edit', auth.verifyToken, (req, res) => {
        var query = { _id: new ObjectId(req.body._id) };
        var update = req.body;
        delete update._id;
        db.collection("sections").updateOne(query, { $set: update }, (err, item) => {
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

    router.post('/sections/delete', auth.verifyToken, (req, res) => {
        var useid = new ObjectId(req.body._id);
        var query = { _id: useid };
        db.collection("sections").deleteOne(query, (err, item) => {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                db.collection("sections").deleteOne(query, (err, deleted) => {
                    db.collection("items").find({sectionId: useid}).toArray().then(i => {
                        i.forEach(item => {
                            let itemtoLookFor = { _id: i._id };
                            db.collection("comments").deleteMany({ itemId: i._id }, (err, obj) => { });
                        });
                    });
                });
                db.collection("items").deleteMany({ sectionId: useid }, (err, obj) => { });
                res.send({
                    error: false,
                    message: item
                });
            }
        })
    });

    router.post('/sections/getall', auth.verifyToken, (req, res) => {
        var query = { creator: ObjectId(req.body.creator) };
        db.collection("sections").find(query).toArray((err, item) => {
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


    router.post('/sections/create', auth.verifyToken, (req, res) => {
        const temp = ObjectId(req.body.templateName);
        db.collection("templates").findOne({ _id: temp }, (err, found) => {
            req.body.templateName = found.name;
            req.body.templateId = temp;
            req.body.creator = ObjectId(req.body.creator);
            db.collection("sections").insertOne(req.body, (err, inserted) => {
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

}