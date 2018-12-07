var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
const jwt = require('jsonwebtoken');
var auth = require('../Auth.js');

module.exports = function (router, db, config) {

    router.post('/clients/getall', auth.verifyToken, (req, res) => {
        db.collection("clients").find({ UserId: req.body.user }).toArray().then(array => {
            res.send({
                error: false,
                message: array
            })
        });
    });
}