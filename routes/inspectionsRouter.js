var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
const jwt = require('jsonwebtoken');
var auth = require('../Auth.js');

module.exports = function (router, db, config) {
    router.post('/inspections/save', auth.verifyToken, (req, res) => {
        const changeToIds = [
            'inspectors',
            'service'
        ];
        changeToIds.map(id => {
            req.body[id] = ObjectId(req.body[id]);
        });
        db.collection("inspections").insertOne(req.body, (err, item) => {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                const client = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    phone: req.body.phone,
                    email: req.body.email,
                    UserId: req.body['inspectors'].toString()
                }
                db.collection('clients').insertOne(client, (err, inserted) => {
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
            }
        });
    });

    router.post('/inspections/getall', auth.verifyToken, (req, res) => {
        db.collection("inspections").find({ UserId: req.body.userId }).toArray().then(array => {
            res.send({
                error: false,
                message: array
            })
        });
    });
}