const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const md5 = require('md5');
const defaultResponse = {
    error: false,
    message: 200
}
var db = null;
const fs = require('fs');
const path = require('path');
const defaultErrMsg = "An unhandled exception occured. Contact your administrator.";

function jstring(json) {
    return JSON.stringify(json);
}

function verify(req, res, db, next) {
    let verifyQuery = {
        value: req.body.value,
        datetime: new Date(req.body.datetime)
    }
    
    db.collection("tokens").findOne(verifyQuery, (err, obj) => {
        if (err) {
            res.send(jstring({ error: true, message: defaultErrMsg }));
            console.log(err);
        } else if (obj) {
            next();
        } else {
            res.send(jstring({ error: true, message: "Invalid session detected, kindly log in." }));
        }
    });
}

module.exports = function (router, dbconfig, root) {
    mongoClient.connect(dbconfig.url, { useNewUrlParser: true }, (err, database) => {
        if (err) {
            console.log("Database is inaccessible. Check your network or DB - Instance.\nIf everything is correct, type \"rs\" and press ENTER");
            process.exit();
            return false;
        } else {
            db = database.db(dbconfig.name);
        }
    });

    router.post("/auth", (req, res) => {
        let loginQuery = {
            username: req.body.username,
            password: req.body.username
        }
        db.collection("users").findOne(loginQuery, (err, obj) => {
            if (err) {
                res.send(jstring({ error: true, message: defaultErrMsg }));
                console.log(err);
            } else if (obj) {
                let now = new Date();
                let token = md5(loginQuery.username + now + loginQuery.password);
                db.collection("tokens").insertOne({
                    value: token,
                    datetime: now
                }, (err, obj) => {
                    if (err) {
                        res.send(jstring({ error: true, message: defaultErrMsg }));
                        console.log(err);
                    } else {
                        res.send(jstring({ error: false, message: "success", token: token, datetime: now }));
                    }
                });
            } else {
                res.send(jstring({ error: true, message: "Invalid credentials entered." }));
            }
        })
    });

    router.post('/retreivenotification', (req, res) => {
        verify(req, res, db, function () {
            db.collection("notifications").findOne({_id: new ObjectID(req.body._id)}, (err, obj) => {
                if(err){
                    res.send(jstring({ error: true, message: defaultErrMsg }));
                } else {
                    res.send(jstring({ error: false, message: {announcement: obj.announcement, body: obj.body} }));
                }
            });
        });
    });

    router.post('/editannouncement', (req, res) => {
        verify(req, res, db, function () {
            let updates = {
                announcement: req.body.announcement,
                body: req.body.body
            }

            Object.keys(updates).forEach(function(k){
                if (updates[k] == "" || updates[k] == null){
                    delete updates[k];
                }
            });
            const len = Object.keys(updates).length;
            if(len != 0){
                db.collection("notifications").updateOne({ _id: new ObjectID(req.body._id)}, {$set: updates}, (err, obj) => {
                    if (err) {
                        res.send(jstring({ error: true, message: defaultErrMsg }));
                    } else {
                        res.send(jstring({ error: false, message: "Your announcement has been updated." }));
                    }
                });
            } else {
                res.send(jstring({ error: false, message: "Your announcement has been updated." }));
            }
        });
    });

    router.post("/gettokenforboard", (req, res) => {
        let now = new Date();
        let token = md5('abcde' + now + '12345');
        db.collection("tokens").insertOne({
            value: token,
            datetime: now
        }, (err, obj) => {
            if (err) {
                res.send(jstring({ error: true, message: defaultErrMsg }));
                console.log(err);
            } else {
                res.send(jstring({ error: false, message: {token: token, datetime: now } }));
            }
        });
    });

    router.post("/verifytoken", (req, res) => {
        verify(req, res, db, function(){
            res.send(jstring({ error: false, message: "success" }));
        });
    });

    router.post("/notifications", (req, res) => {
        verify(req, res, db, function () {
            db.collection("notifications").find().toArray().then(function(n){
                let response = [];
                n.forEach(function(k){
                    response.push(k);
                });
                res.send(jstring({ error: false, message: {
                    data: response,
                    length: n.length
                } }));
            });
        });
    });

    router.post("/pushannouncement", (req,res) => {
        verify(req, res, db, function () {
            let announcement = req.body.announcement;
            let body = req.body.body;
            if(!announcement || !body ){
                res.send(jstring({ error: true, message: "Please enter all of the fields." }));
            } else {
                db.collection("notifications").insertOne({announcement: announcement, body: body}, (err, inserted) => {
                    if (err) {
                        res.send(jstring({ error: true, message: defaultErrMsg }));
                        console.log(err);
                    } else {
                        res.send(jstring({ error: false, message: "Your announcement has been published." }));
                    }
                });
            }
        });
    });

    router.post('/delannouncement', (req, res) => {
        verify(req, res, db, function () {
            let query = { _id: new ObjectID(req.body._id)};
            db.collection("notifications").deleteOne(query, (err, deleted) => {
                if (err) {
                    res.send(jstring({ error: true, message: defaultErrMsg }));
                    console.log(err);
                } else {
                    res.send(jstring({ error: false, message: "Announcement has been deleted" }));
                }
            });
        });
    });

    router.post('/pushcarousel', (req,res) => {
        verify(req, res, db, function () {
            let ext = '';
            let buffer = null;
            if (req.body.image.indexOf('png') != -1){
                ext = 'png';
                buffer = req.body.image.replace(/data:image\/png;base64,/, '');
            } else if (req.body.image.indexOf('jpg') != -1) {
                ext = 'jpg';
                buffer = req.body.image.replace(/data:image\/jpg;base64,/, '');
            } 
            delete req.body.image;
            req.body.ext = ext;
            db.collection("carousels").insertOne(req.body, (err, ins) => {
                fs.writeFile(`./carousels/${ins.insertedId}.${ext}`, buffer, 'base64', (err) => {
                    if(err) {
                        res.send(jstring({ error: true, message: defaultErrMsg }));
                        console.log(err);
                    } else {
                        res.send(jstring({ error: false, message: 'Carousel image has been saved.' }));
                    }
                })
            });
        });
    });

    router.post('/getcarousels', (req, res) => {
        verify(req, res, db, function () {
            db.collection('carousels').find({}).toArray().then((arr) => {
                res.send(jstring({ error: false, message: arr }));
            })
        });
    });

    router.post('/deletecarousel', (req, res) => {
        verify(req, res, db, function () {
            const query = {_id : new ObjectID(req.body.id)};
            db.collection('carousels').deleteOne(query ,(err, deleted) => {
                if (err) {
                    res.send(jstring({ error: true, message: defaultErrMsg }));
                    console.log(err);
                } else {
                    res.send(jstring({ error: false, message: 'Carousel image has been deleted.' }));
                }
            })
        });
    })

    router.get('/', (req, res) => {
        res.send(jstring(defaultResponse));
    });

    router.post('/', (req, res) => {
        res.send(jstring(defaultResponse));
    });

    router.get('*', (req, res) => {
        let urlparts = req.url.split(".");
        const useRoot = root + '/carousels/';
        if (fs.existsSync(path.join(useRoot, req.url))) {
            res.setHeader("Content-Type", "text/" + urlparts[urlparts.length - 1]);
            res.sendFile(path.join(useRoot, req.url));
        } else {
            res.send(jstring(defaultResponse));
        }
    });

    router.post('*', (req, res) => {
        res.send(jstring(defaultResponse));
    });
}