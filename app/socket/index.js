let usersconnected = 0;
const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const md5 = require('md5');
const dbconfig = require('../../injects/db');
const fs = require('fs');
var db = null;
var process = require('process');
const errMsg = 'An error occured, contact your administrator';

module.exports = function(io){
    mongoClient.connect(dbconfig.url, {useNewUrlParser: true}, (err, database) => {
       if(err){
        // io.broadcast.emit('error', `${errMsg}. Code: 10001Socket`);
        console.log("Database is inaccessible. Check your network or DB - Instance.\nIf everything is correct, type \"rs\" and press ENTER");
        process.exit();        
        return false;
       } else {
        db = database.db(dbconfig.name);
       }
    });

    io.on('connection', function(socket){
        usersconnected++;
        console.log(`Connected.\nUsers connected: ${usersconnected}`);
        socket.on('disconnect', function(){
            usersconnected--;
            console.log(`Disonnected.\nUsers connected: ${usersconnected}`);
        });
        
        socket.on('getuserinfo', function(msg){
            let response = {
                error: false
            }
            db.collection('tokens').findOne({token: msg}, (err, o1) => {
                if(err){
                    response.error = true;
                    io.emit('userinforeturned','An error occued 0x0005678');
                } else {
                    db.collection('users').findOne({name : o1.user}, (err, o2) => {
                        if(err){
                            response.error = true;
                            io.emit('userinforeturned','An error occued 0x0005678');
                        } else {
                            response.passlen = o2.pass.length,
                            response.username = o2.name
                            io.emit('userinforeturned',response);
                        }
                    });
                }
            })
        });

        socket.on('changecreds', function(msg){
            db.collection('tokens').findOne({token : msg.token}, (err, o1) => {
                if(err){
                    io.emit('changedinfo',{error : true, msg : "An error occured. Please contact Administrator"});
                } else if(!o1){
                    io.emit('changedinfo',{error : true, msg : "An error occured. Please contact Administrator"});
                } else {
                    let username = o1.user;
                    Object.keys(msg.data).forEach(function(k){
                        if(msg.data[k] == null && msg.data[k] == ""){
                            delete msg.data[k];
                        }
                    });
                    db.collection('users').updateOne({name : o1.user}, {$set : msg.data}, (err, data) => {
                        if(err){
                            io.emit('changedinfo',{error : true, msg : "An error occured. Please contact Administrator"});
                        } else {
                            io.emit('changedinfo',{error : false, msg : {name : o1.user, message : "Your credentials have been updated"}});
                        }
                    });
                }
            })
        });
        
        socket.on('register-student-file', function(reg){
            var student = {
                name : reg.name
            };
            db.collection("students").find({}).limit(1).sort({ID: -1}).toArray().then(function(o){
                let newId = "";
                if(o.length > 0){
                    newId = (parseInt(o[0].ID)+1).toString();
                } else {
                    newId = "000000000";
                }
                let rep = 9 - newId.length;
                if(rep > 0){
                    student.ID = "0".repeat(rep) + newId;
                } else {
                    student.ID = newId;
                }
                db.collection("students").insertOne(student, (err,obj) => {
                    if(err){
                        io.emit('error', `Unable to register student at this time. ${err}`);
                    }
                    else if(reg.hasOwnProperty('file')){
                        fs.writeFile(`./data/students/${student.ID}.png`, reg.file , (err) =>{
                            if(err){
                                io.emit('filenotpresent', `Image not present, please recapture an image.`);
                            }
                        });
                    } else {
                        fs.rename('./tmp/tmp.png',`./data/students/${student.ID}.png`, (err) => {
                            if(err){
                                io.emit('filenotpresent', `Image not present, please recapture an image.`);                                
                            } else {
                                io.emit('studentregistered', student);
                            }
                        })
                    }
                });
            });
        });
        socket.on('save-image', function(data){
            let img = data.replace(/^data:image\/png;base64,/,"");
            fs.writeFile("./tmp/tmp.png", img, 'base64',function(err) {
                if(err) {
                    return console.log(err);
                }
            }); 
        })
        socket.on('message', function(msg){
            console.log(msg);
        });
        socket.on('logmein', function(creds){
            let username = creds.username;
            let password = creds.password;
            if(username == "" || password == ""){
                io.emit('error','Please insert all of the required fields');
            } else {
                db.collection('users').findOne({'name' : username, 'pass': password}, (err, obj) => {
                    if(err){
                        io.emit('error',`${errMsg}. Code: 10002Socket`);
                    } else {
                        if(!obj){
                            io.emit('error','You have entered incorrect credentials.');
                        } else {
                            let response = {
                                token : md5((new Date()) + (new ObjectID())),
                            };
                            db.collection('tokens').insert({_id: new ObjectID(), "token": response.token, "user" : username}, (err, ins) => {
                                if(err){
                                    io.emit('error',`${errMsg}. Code: 10003Socket`);
                                } else {
                                    io.emit('loginsuccess',response);
                                }
                            });
                        }
                    }
                });
            }
        });

        socket.on('searchname', function(name){
            let str = "";
            name.split("").forEach(function(c){
                str += `[${c}].*`;
            });
            db.collection('students').find({name : { $regex : new RegExp(`^.*${str}.*`, "i") }}).toArray().then(function(objArr){
                let response = {
                    type : 'students',
                    array: objArr
                }
                io.emit('studentsreturned',response);
            });
        });
        
        socket.on('searchid', function(msg){
            let str = "";
            msg.split("").forEach(function(c){
                str += `[${c}]{1}`;
            });
            db.collection('students').find({ID : { $regex : str }}).toArray().then(function(objArr){
                let response = {
                    type : 'students',
                    array: objArr
                }
                io.emit('studentsreturned',response);
            });
        });

        socket.on('checkcode', function(msg){
            msg.code = msg.code.toUpperCase();
            console.log(msg.code);
            db.collection('courses').findOne({"code" : msg.code}, (err, obj) => {
                if(err){
                    io.emit('gotcode', `${errMsg}. Code: 10002Socket`);
                } else if(obj){
                    io.emit('gotcode', 'A course with that code already exists');
                } else if (obj == null){
                    db.collection("courses").insertOne({_id : new ObjectID(), name: msg.name, code: msg.code, time: msg.time}, (err, obj) => {
                        if(err){
                            io.emit('error', `${errMsg}. Code: 10002Socket`);
                        }
                        else{
                            io.emit('gotcode', `Course '${msg.name}' ( ${msg.code}, for slot - ${msg.time}), has been registered.`);
                        }
                    });
                }
            });
        });

        socket.on('retreivecourses', function(msg){
            if(msg == ""){
                db.collection('courses').find({}).toArray().then(function(c){
                    io.emit('receivecourses', c);
                });
            } else {
                db.collection('courses').find({ "code" : { $regex : msg}}).toArray().then(function (c) {
                    io.emit('receivecourses', c);
                });
            }
        });

        socket.on('retreivestudentids', function(msg){
            if (msg == "") {
                db.collection('students').find({}).toArray().then(function (c) {
                    io.emit('receivestudents', c);
                });
            } else {
                db.collection('students').find({ _id : { $regex: msg } }).toArray().then(function (c) {
                    io.emit('receivestudents', c);
                });
            }
        });

        socket.on('assigncourse', function(msg){
            let id = msg.id;
            let code = msg.code.toUpperCase();
            let studentId = {ID : id};
            let exists = false;
            db.collection("students").findOne(studentId, (err, obj) => {
                if(err){
                    console.log(err);
                } else if (obj){
                    if(!obj.hasOwnProperty('courses')){
                        obj.courses = [];
                    } else {
                        obj.courses.forEach(function(o){
                            if(o.code == code){
                                exists = true;
                                return true;
                            }
                        });
                    }
                    if(exists){
                        io.emit('assignprocess','This student is already registered for this course');
                    } else {
                        let newcourse = {"code":code};
                        obj.courses.push(newcourse);
                        let pushParam = {$set : {courses : obj.courses}};
                        db.collection('students').updateOne(studentId, pushParam, (err, inserted) => {
                            if(err){
                                console.log(err);
                                io.emit('assignprocess',`An un handled exception occured. code 0x008cf73B`);
                            } else {
                                console.log(inserted);
                                io.emit('assignprocess',`${obj.name} (ID : ${obj.ID}) has been registered for course ${code})`);
                            }
                        });
                    }
                } else {
                    io.emit('assignprocess',`Student ID - ${id} does not exist, please enter the complete ID or select one from the list.`);
                }
            });
        });

    });
}