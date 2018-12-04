var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
const jwt = require('jsonwebtoken');

module.exports = function (router, db, config) {
    //Signup Route
    router.post('/inspector/signup', (req, res) => {
        req.body.Password = md5(req.body.Password);
        db.collection("inspector").insertOne(req.body, function (err, item) {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: "Registered Successfully"
                })
            }
        });
    })
    //Login Route
    router.post('/inspector/login', (req, res) => {
        db.collection("inspector").findOne({ Email: req.body.Email }, function (err, user) {
           if (user === null) {
                res.send({
                    error: true,
                    message: "Inspector does not exist"
                })
            } else if (user.Email === req.body.Email && user.Password === md5(req.body.Password)) {
                const token = jwt.sign({ user: user }, config.secret);
                res.send({
                    error: false,
                    message: token
                })
            } else {
                res.send({
                    error: true,
                    message: "Invalid Credentials"
                })
            }
        });
    })
    

}