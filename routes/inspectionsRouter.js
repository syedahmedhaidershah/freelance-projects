var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
const jwt = require('jsonwebtoken');
var auth = require('../Auth.js');

module.exports = function (router, db, config) {
    router.post('/inspections/save', auth.verifyToken, (req, res) => {
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
}