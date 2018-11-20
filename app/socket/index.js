let usersconnected = 0;
const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const md5 = require('md5');
const dbconfig = require('../../injects/db');
const fs = require('fs');
var db = null;
var process = require('process');
const errMsg = 'An error occured, contact your administrator';
const request = require("request");
const isPng = require("is-png");
const Excel = require('exceljs');

function isJson(string) {
    let state = false;
    try {
        JSON.parse(string);
        state = true;
    } catch (ex) {
        state = false;
    }
    if (state) {
        return true;
    } else {
        return false;
    }
}

function dmyDate() {
    var d = new Date();
    return `${d.getDate()}-${d.getMonth() + 1}-${+ d.getFullYear()}`;
}

function nowMinutesToday(time) {
    if (time == undefined || time == null) {
        n = new Date();
        time = `${n.getHours()}:${n.getMinutes()}`;
    }
    hours = time.split(":")[0];
    minutes = time.split(":")[1];
    return (parseInt(hours) * 60 + parseInt(minutes));
}

module.exports = function (io) {
    require('../../sandbox/requireifnotfound')();
    mongoClient.connect(dbconfig.url, { useNewUrlParser: true }, (err, database) => {
        if (err) {
            // io.broadcast.emit('error', `${errMsg}. Code: 10001Socket`);
            console.log("Database is inaccessible. Check your network or DB - Instance.\nIf everything is correct, type \"rs\" and press ENTER");
            process.exit();
            return false;
        } else {
            db = database.db(dbconfig.name);
        }
    });

    io.on('connection', function (socket) {
        usersconnected++;
        console.log(`Connected.\nUsers connected: ${usersconnected}`);
        socket.on('disconnect', function () {
            usersconnected--;
            console.log(`Disonnected.\nUsers connected: ${usersconnected}`);
        });

        socket.on('getuserinfo', function (msg) {
            let response = {
                error: false
            }
            db.collection('tokens').findOne({ token: msg }, (err, o1) => {
                if (err) {
                    response.error = true;
                    io.emit('userinforeturned', 'An error occued 0x0005678');
                } else if (o1) {
                    db.collection('users').findOne({ name: o1.user }, (err, o2) => {
                        if (err) {
                            response.error = true;
                            io.emit('userinforeturned', 'An error occued 0x0005678');
                        } else {
                            response.passlen = o2.pass.length,
                                response.username = o2.name
                            io.emit('userinforeturned', response);
                        }
                    });
                } else {
                    io.emit("error", "Please sign in again to continue.");
                }
            })
        });

        socket.on('changecreds', function (msg) {
            db.collection('tokens').findOne({ token: msg.token }, (err, o1) => {
                if (err) {
                    io.emit('changedinfo', { error: true, msg: "An error occured. Please contact Administrator" });
                } else if (!o1) {
                    io.emit('changedinfo', { error: true, msg: "An error occured. Please contact Administrator" });
                } else {
                    let username = o1.user;
                    let late = msg.data.late;
                    Object.keys(msg.data).forEach(function (k) {
                        if (msg.data[k] == null && msg.data[k] == "" || msg.data[k] == 0) {
                            delete msg.data[k];
                        }
                    });
                    db.collection('users').updateOne({ name: o1.user }, { $set: msg.data }, (err, data) => {
                        if (err) {
                            io.emit('changedinfo', { error: true, msg: "An error occured. Please contact Administrator" });
                        } else {
                            let late = msg.data.late;
                            if(late != "" && late != null && late != 0){
                                db.collection("preferences").updateOne({type: "late"}, {$set: {value: late}}, (err, belated) => {
                                    if(err){
                                        io.emit('changedinfo', { error: true, msg: "An error occured. Please contact Administrator" });
                                    } else {
                                        io.emit('changedinfo', { error: false, msg: { name: o1.user, message: "Your settings have been updated" } });
                                    }
                                });
                            } else {
                                io.emit('changedinfo', { error: false, msg: { name: o1.user, message: "Your settings have been updated" } });
                            }
                        }
                    });
                }
            })
        });

        socket.on('register-student-file', function (reg) {
            var student = {
                name: reg.name
            };
            db.collection("students").find({}).limit(1).sort({ ID: -1 }).toArray().then(function (o) {
                let newId = "";
                if (o.length > 0) {
                    newId = (parseInt(o[0].ID) + 1).toString();
                } else {
                    newId = "000000000";
                }
                let rep = 9 - newId.length;
                if (rep > 0) {
                    student.ID = "0".repeat(rep) + newId;
                } else {
                    student.ID = newId;
                }
                db.collection("students").insertOne(student, (err, obj) => {
                    if (err) {
                        io.emit('error', `Unable to register student at this time. ${err}`);
                        return false;
                    }
                    else if (reg.hasOwnProperty('file')) {
                        fs.writeFile(`./AMSApi/${student.ID}.png`, reg.file, (err) => {
                            if (err) {
                                io.emit('filenotpresent', `Image not present, please recapture an image.`);
                            } else {
                                io.emit('studentregistered', student);
                                request.post('http://localhost:5000/train', (error, res, body) => {
                                    if (error) {
                                        console.error(error)
                                        return false;
                                    }
                                    console.log(body);
                                });
                            }
                        });
                    } else {
                        fs.rename('./AMSApi/tmp.png', `./AMSApi/${student.ID}.png`, (err) => {
                            if (err) {
                                io.emit('filenotpresent', `Image not present, please recapture an image.`);
                            } else {
                                io.emit('studentregistered', student);
                                request.post('http://localhost:5000/train', (error, res, body) => {
                                    if (error) {
                                        console.error(error)
                                        return false;
                                    }
                                    console.log(body);
                                });
                            }
                        })
                    }
                });
            });
        });
        socket.on('save-image', function (data) {
            if (data.type == "buffer") {
                let img = data.src.replace(/^data:image\/png;base64,/, "");
                fs.writeFile("./AMSApi/tmp.png", img, 'base64', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            } else {
                let src = data.src
                img = src.replace(/data:image\/jpeg;base64,/, "");
                fs.writeFile("./AMSApi/tmp.png", img, 'base64', (err) => {
                    console.log(err);
                });
            }
        })
        socket.on('message', function (msg) {
            console.log(msg);
        });
        socket.on('logmein', function (creds) {
            let username = creds.username;
            let password = creds.password;
            if (username == "" || password == "") {
                io.emit('error', 'Please insert all of the required fields');
            } else {
                db.collection('users').findOne({ 'name': username, 'pass': password }, (err, obj) => {
                    if (err) {
                        io.emit('error', `${errMsg}. Code: 10002Socket`);
                    } else {
                        if (!obj) {
                            io.emit('error', 'You have entered incorrect credentials.');
                        } else {
                            let response = {
                                token: md5((new Date()) + (new ObjectID())),
                            };
                            db.collection('tokens').insertOne({ _id: new ObjectID(), "token": response.token, "user": username }, (err, ins) => {
                                if (err) {
                                    io.emit('error', `${errMsg}. Code: 10003Socket`);
                                } else {
                                    io.emit('loginsuccess', response);
                                }
                            });
                        }
                    }
                });
            }
        });

        socket.on('searchname', function (name) {
            let str = "";
            name.split("").forEach(function (c) {
                str += `[${c}].*`;
            });
            db.collection('students').find({ name: { $regex: new RegExp(`^.*${str}.*`, "i") } }).toArray().then(function (objArr) {
                let response = {
                    type: 'students',
                    array: objArr
                }
                io.emit('studentsreturned', response);
            });
        });

        socket.on('searchid', function (msg) {
            let str = "";
            msg.split("").forEach(function (c) {
                str += `[${c}]{1}`;
            });
            db.collection('students').find({ ID: { $regex: str } }).toArray().then(function (objArr) {
                let response = {
                    type: 'students',
                    array: objArr
                }
                io.emit('studentsreturned', response);
            });
        });

        socket.on('checkcode', function (msg) {
            msg.code = msg.code.toUpperCase();
            db.collection('courses').findOne({ "code": msg.code }, (err, obj) => {
                if (err) {
                    io.emit('gotcode', `${errMsg}. Code: 10002Socket`);
                } else if (obj) {
                    io.emit('gotcode', 'A course with that code already exists');
                } else if (obj == null) {
                    db.collection("courses").insertOne({ _id: new ObjectID(), name: msg.name, code: msg.code, time: msg.time, status: 1 }, (err, obj) => {
                        if (err) {
                            io.emit('error', `${errMsg}. Code: 10002Socket`);
                        }
                        else {
                            io.emit('gotcode', `Course '${msg.name}' ( ${msg.code}, for slot - ${msg.time}), has been registered.`);
                        }
                    });
                }
            });
        });

        socket.on('retreivecourses', function (msg) {
            if (msg == "") {
                db.collection('courses').find({}).toArray().then(function (c) {
                    io.emit('receivecourses', c);
                });
            } else {
                db.collection('courses').find({ "code": { $regex: msg } }).toArray().then(function (c) {
                    io.emit('receivecourses', c);
                });
            }
        });

        socket.on('retreivestudentids', function (msg) {
            if (msg == "") {
                db.collection('students').find({}).toArray().then(function (c) {
                    io.emit('receivestudents', c);
                });
            } else {
                db.collection('students').find({ _id: { $regex: msg } }).toArray().then(function (c) {
                    io.emit('receivestudents', c);
                });
            }
        });

        socket.on('assigncourse', function (msg) {
            let id = msg.id;
            let code = msg.code.toUpperCase();
            let studentId = { ID: id };
            let exists = false;
            db.collection("students").findOne(studentId, (err, obj) => {
                if (err) {
                    console.log(err);
                } else if (obj) {
                    if (!obj.hasOwnProperty('courses')) {
                        obj.courses = [];
                    } else {
                        obj.courses.forEach(function (o) {
                            if (o.code == code) {
                                exists = true;
                                return true;
                            }
                        });
                    }
                    if (exists) {
                        io.emit('assignprocess', 'This student is already registered for this course');
                    } else {
                        let newcourse = { "code": code };
                        obj.courses.push(newcourse);
                        let pushParam = { $set: { courses: obj.courses } };
                        db.collection('students').updateOne(studentId, pushParam, (err, inserted) => {
                            if (err) {
                                console.log(err);
                                io.emit('assignprocess', `An un handled exception occured. code 0x008cf73B`);
                            } else {
                                console.log(inserted);
                                io.emit('assignprocess', `${obj.name} (ID : ${obj.ID}) has been registered for course ${code})`);
                            }
                        });
                    }
                } else {
                    io.emit('assignprocess', `Student ID - ${id} does not exist, please enter the complete ID or select one from the list.`);
                }
            });
        });

        socket.on("checkimageinset", (data) => {
            var code = data.code;
            var checkin = data.time;
            // request.post({ url: "http://localhost:5000/test", form: { file: data }, headers: { 'Content-Type': 'application/json' } }, function (error, response, body) {
            //     if (error) {
            //         console.log(error);
            //     } else if (response.statusCode == 500) {
            //         console.log(body);
            //     } else {
            //         console.log(body);
            //     }
            // });
            request.post('http://localhost:5000/test', {
                json: {
                    file: data.file
                }
            }, (error, res, body) => {
                if (error) {
                    console.error(error)
                    return false;
                }
                var trueObj = null;
                var response = res.body;
                if (typeof (response) == "string") {
                    response = response.replace(/\'/g, '\"');
                    response = response.replace(/(True)/g, true);
                    response = response.replace(/(False)/g, false);
                    response = JSON.parse(response);
                }
                // if (!isJson(response)) {
                //     console.log(response);
                //     console.log("An error occured on flask.");
                //     return false;
                // }
                if (response.error) {
                    io.emit("attendance-check-return", { error: true, state: 1, message: response.message });
                    return false;
                }
                Object.keys(response).forEach(function (k) {
                    if (response[k][0] == true) {
                        trueObj = k;
                        return false;
                    }
                });
                if (!trueObj) {
                    io.emit("attendance-check-return", { error: true, state: 1, message: "You are not registered for this course" });
                    return false;
                }
                let sid = trueObj.split(".")[0];
                db.collection("students").findOne({ ID: sid }, (err, obj) => {
                    if (err) {
                        io.emit('attendance-check-return', { error: true, state: 0, message: `An un handled exception occured. code 0x108cf73B` });
                    } else if (obj) {
                        var foundcourse = false;
                        if (obj.hasOwnProperty("courses")) {
                            Object.keys(obj.courses).forEach(function (k) {
                                if (obj.courses[k].code.toLowerCase() == code.toLowerCase()) {
                                    foundcourse = true;
                                }
                            });
                            if (foundcourse) {
                                db.collection("courses").findOne({ code: code.toUpperCase(), status: 1 }, (err, course) => {
                                    if (err) {
                                        io.emit('attendance-check-return', { error: true, state: 0, message: `An un handled exception occured. code 0x108cf73B` });
                                    } else if (course) {
                                        let inserttoken = md5(new Date().getTime());
                                        let tokenid = new ObjectID();
                                        db.collection("tokens").insertOne({ _id: tokenid, token: inserttoken, cause: "markattendance", time: checkin, start: course.time }, (err, ins) => {
                                            if (err) {
                                                io.emit('attendance-check-return', { error: true, state: 0, message: `An un handled exception occured. code 0x108cf73B` });
                                            } else if (ins) {
                                                db.collection("lectures").findOne({ code: course.code }, (err, lecobj) => {
                                                    if (err) {
                                                        io.emit('attendance-check-return', { error: true, state: 0, message: `An un handled exception occured. code 0x108cf73B` });
                                                    } else if (!lecobj) {
                                                        db.collection("lectures").insertOne({ date: dmyDate(), code: course.code, lecture: 1 }, (err, lecIns) => {
                                                            if (err) {
                                                                io.emit('attendance-check-return', { error: true, state: 0, message: `An un handled exception occured. code 0x108cf73B` });
                                                            } else {
                                                                let attendanceObj = {
                                                                    ID: sid,
                                                                    code: code.toUpperCase(),
                                                                    checkin: checkin,
                                                                    status: null,
                                                                    date: dmyDate(),
                                                                    time: course.time,
                                                                    lecture: lecIns.insertedId
                                                                };
                                                                db.collection("attendance").insertOne(attendanceObj, (err, attIns) => {
                                                                    if (err) {
                                                                        io.emit('attendance-check-return', { error: true, state: 0, message: `An un handled exception occured. code 0x108cf73B` });
                                                                    } else {
                                                                        db.collection("tokens").updateOne({ _id: tokenid }, { $set: { relative: attIns.insertedId } }, (err, objUp) => {
                                                                            if (err) {
                                                                                io.emit('attendance-check-return', { error: true, state: 0, message: `An un handled exception occured. code 0x108cf73B` });
                                                                            } else {
                                                                                io.emit("attendance-check-return", { error: false, message: inserttoken });
                                                                            }
                                                                        })
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    } else {
                                                        if (lecobj.date == dmyDate()) {
                                                            let attendanceObj = {
                                                                ID: sid,
                                                                code: code.toUpperCase(),
                                                                checkin: checkin,
                                                                status: null,
                                                                date: dmyDate(),
                                                                time: course.time,
                                                                lecture: lecobj._id
                                                            };
                                                            db.collection("attendance").insertOne(attendanceObj, (err, attIns) => {
                                                                if (err) {
                                                                    io.emit('attendance-check-return', { error: true, state: 0, message: `An un handled exception occured. code 0x108cf73B` });
                                                                } else {
                                                                    db.collection("tokens").updateOne({ _id: tokenid }, { $set: { relative: attIns.insertedId } }, (err, objUp) => {
                                                                        if (err) {
                                                                            io.emit('attendance-check-return', { error: true, state: 0, message: `An un handled exception occured. code 0x108cf73B` });
                                                                        } else {
                                                                            io.emit("attendance-check-return", { error: false, message: inserttoken });
                                                                        }
                                                                    })
                                                                }
                                                            });
                                                        } else {
                                                            db.collection("lectures").insertOne({ date: dmyDate(), code: course.code, lecture: (lecobj.lecture + 1) }, (err, lecIns) => {
                                                                if (err) {
                                                                    io.emit('attendance-check-return', { error: true, state: 0, message: `An un handled exception occured. code 0x108cf73B` });
                                                                } else {
                                                                    let attendanceObj = {
                                                                        ID: sid,
                                                                        code: code.toUpperCase(),
                                                                        checkin: checkin,
                                                                        status: null,
                                                                        date: dmyDate(),
                                                                        time: course.time,
                                                                        lecture: lecIns.insertedId
                                                                    };
                                                                    db.collection("attendance").insertOne(attendanceObj, (err, attIns) => {
                                                                        if (err) {
                                                                            io.emit('attendance-check-return', { error: true, state: 0, message: `An un handled exception occured. code 0x108cf73B` });
                                                                        } else {
                                                                            db.collection("tokens").updateOne({ _id: tokenid }, { $set: { relative: attIns.insertedId } }, (err, objUp) => {
                                                                                if (err) {
                                                                                    io.emit('attendance-check-return', { error: true, state: 0, message: `An un handled exception occured. code 0x108cf73B` });
                                                                                } else {
                                                                                    io.emit("attendance-check-return", { error: false, message: inserttoken });
                                                                                }
                                                                            })
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            } else {
                                                io.emit('attendance-check-return', { error: true, state: 0, message: `An un handled exception occured. code 0x108cf73B` });
                                            }
                                        });
                                    } else {
                                        io.emit('attendance-check-return', { error: true, state: 0, message: `No such course is available at the moment.` });
                                    }
                                })
                            } else {
                                io.emit('attendance-check-return', { error: true, state: 0, message: `You are not registered for this course.` });
                            }
                        } else {
                            io.emit('attendance-check-return', { error: true, state: 0, message: `You are not registered for this course.` });
                        }
                    } else {
                        socket.emit("attendance-check-return", { error: true, state: 1, message: "Unable to identify student" });
                    }
                })
            })
        });

        socket.on("markattendance", function (msg) {
            let token = msg.token;
            db.collection("tokens").findOne({ token: token }, (err, obj) => {
                if (err) {
                    io.emit("error", "An unhandled exception occured");
                } else if (obj) {
                    db.collection("attendance").findOne({ _id: obj.relative }, (err, atObj) => {
                        if (err) {
                            io.emit("error", "An unhandled exception occured");
                        } else if (!atObj.status) {
                            let now = nowMinutesToday(null);
                            let then = nowMinutesToday(atObj.time);
                            db.collection("preferences").findOne({type: "late"}, (err, pref) => {
                                if (now - then <= pref.value) {
                                    db.collection("attendance").updateOne({ _id: atObj._id }, { $set: { status: 1 } }, (err, obj) => {
                                        if (err) {
                                            io.emit("error", "An unhandled exception occured");
                                        } else {
                                            io.emit("attendancemarked", "Your attendance has been marked as Present");
                                        }
                                    });
                                } else if (now - then > pref.value) {
                                    db.collection("attendance").updateOne({ _id: atObj._id }, { $set: { status: 2 } }, (err, obj) => {
                                        if (err) {
                                            io.emit("error", "An unhandled exception occured");
                                        } else {
                                            io.emit("attendancemarked", "Your attendance has been marked as Late");
                                        }
                                    });
                                }
                            });
                        } else {
                            io.emit("attendancemarked", "Your attendance has already been marked.");
                        }
                    });
                } else {
                    io.emit("error", "A probable attack on the system was discovered. Kindly report to the administrator");
                }
            })
        });

        socket.on("generatereport", function (msg) {
            let code = msg.code.toUpperCase();
            let from = msg.from;
            let to = msg.to;
            db.collection("attendance").find({ code: code }).toArray().then(function (arr) {
                let students = {};
                iterator = 0;
                max = arr.length;
                arr.forEach(function (a) {
                    let now = nowMinutesToday(null);
                    let then = nowMinutesToday(a.checkin);
                    n = new Date();
                    time = `${n.getHours()}:${n.getMinutes()}`;
                    students[a.ID] = {};
                    students[a.ID].attendance = [];
                    students[a.ID].total = 0;
                    db.collection("students").findOne({ ID: a.ID }, (err, s) => {
                        students[a.ID].name = s.name;
                        if (a.status == 1) {
                            students[a.ID].attendance.push("P");
                            students[a.ID].total = students[a.ID].total + 1;
                        } else if (a.status == 2) {
                            students[a.ID].attendance.push("L");
                        } else {
                            students[a.ID].attendance.push("A");
                        }
                        iterator++;
                    });
                });
                global.reportInterval = setInterval(function () {
                    if (max >= iterator) {
                        var workbook = new Excel.Workbook();
                        workbook.creator = 'sahs';
                        workbook.lastModifiedBy = 'sahs';
                        workbook.created = new Date()
                        workbook.modified = new Date();
                        workbook.lastPrinted = new Date(2018, 11, 15);
                        workbook.properties.date1904 = true;

                        workbook.views = [
                            {
                                x: 0, y: 0, width: 10000, height: 20000,
                                firstSheet: 0, activeTab: 1, visibility: 'visible'
                            }
                        ];

                        var sheet = workbook.addWorksheet('uotsheet', {
                            properties: {
                                tabColor: {
                                    argb: 'FFC0000'
                                }
                            },
                            pageSetup: {
                                paperSize: 9,
                                orientation: 'landscape'
                            }
                        });
                        var worksheet = workbook.getWorksheet('uotsheet');
                        var begin = 7;
                        worksheet.state = 'show';
                        worksheet.mergeCells('A1:Q1');
                        worksheet.mergeCells('N5:O5');
                        worksheet.getCell("G1").value = "UNIVERSITY OF TURBAT";
                        worksheet.getCell("B3").value = "Course:  " + code;
                        worksheet.getRow(5).values = ["\t\t", "\t\t", "\t\t", "\t\t", "\t\t", "\t\t", "\t\t", "\t\t", "\t\t", "\t\t", "\t\t", "\t\t", "\t\t", "\t\t", "Date: " + dmyDate()];
                        worksheet.getCell("D6").value = "Attendance";
                        worksheet.getRow(begin).values = ["S.no", "Roll no", "Student's Name", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
                        worksheet.getRow(begin).font = {
                            name: 'Calibri',
                            size: 14,
                            underline: false,
                            bold: true
                        }
                        worksheet.getRow(begin).alignment = { vertical: 'middle', horizontal: 'center' };
                        worksheet.mergeCells('D6:Q6');
                        worksheet.getCell('G1').font = {
                            name: 'Calibri',
                            size: 25,
                            underline: true,
                            bold: true
                        };
                        worksheet.getCell('D6').font = {
                            name: 'Calibri',
                            size: 18,
                            bold: true
                        };
                        worksheet.getCell('D6').alignment = { vertical: 'middle', horizontal: 'center' };
                        worksheet.getCell("R7").value = "Total";
                        worksheet.getCell('G1').alignment = { vertical: 'middle', horizontal: 'center' };
                        worksheet.getCell('Q4').alignment = { vertical: 'middle', horizontal: 'right' };
                        worksheet.getRow(5).font = {
                            name: 'Calibri',
                            size: 16,
                            underline: false,
                            bold: true
                        };
                        worksheet.getColumn('B').width = 10;
                        worksheet.getColumn('C').width = 40;
                        var rows = [
                        ];
                        let totals = [];
                        Object.keys(students).forEach(function (key) {
                            rows[begin] = [(begin - 4), key, students[key].name];
                            students[key].attendance.forEach(function (m) {
                                rows[begin].push(m);
                            });
                            var len = students[key].attendance.length;
                            pusha = 14 - len;
                            for (it = 0; it < pusha; it++) {
                                rows[begin].push("A");
                            }
                            console.log(rows[begin]);
                            totals.push(students[key].total);
                            begin++;
                        });
                        worksheet.addRows(rows);
                        let len = totals.length;
                        for (i = 0; i < len; i++) {
                            worksheet.getCell(`R${begin + i}`).value = totals[i];
                        }
                        workbook.xlsx.writeFile("./sandbox/report.xlsx")
                            .then(function () {
                                io.emit("receivereport", { error: false });
                            });
                        clearInterval(global.reportInterval);
                    }
                }, 500);
            });

        });

        socket.on("getcourses", (msg) => {
            db.collection("courses").find({}).toArray().then(function(r){
                io.emit("herecourses", r);
            })
        });

        socket.on("togglecourse", (msg) => {
            let update = 0;
            if(msg.state == "inactive"){
                update = 1
            } else {
                update = 0;
            }
            db.collection("courses").updateOne({code: msg.code}, {$set: {"status": update}}, (err, cupdated) => {
                if(err){
                    io.emit("error", "An unhandled exception occured");
                } else {
                    io.emit("coursetoggled", {
                        code: msg.code,
                        status: update
                    });
                }
            })
        });

        socket.on("deletecourse", function(msg){
            db.collection("courses").deleteOne({code: msg}, (err, deleted) => {
                if (err) {
                    io.emit("error", "An unhandled exception occured");
                } else {
                    io.emit("coursedeleted", {
                        code: msg.code
                    });
                }
            });
        });
    });
}
// `Your attendance has been marked for Course - ${code}, at time - ${checkin}.` 