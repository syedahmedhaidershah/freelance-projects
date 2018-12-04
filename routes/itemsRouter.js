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

}