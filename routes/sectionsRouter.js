var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
const jwt = require('jsonwebtoken');
var auth = require('../Auth.js');

module.exports = function (router, db, config) {

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