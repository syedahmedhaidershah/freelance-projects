var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
const jwt = require('jsonwebtoken');
var auth = require('../Auth.js');

function monthNumber(number) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[number-1];
}

module.exports = function (router, db, config) {

    router.post('/metrics/inspections/getall', auth.verifyToken, (req, res) => {
        db.collection("inspections").find({ UserId: req.body.UserId }).limit(25).sort({date: -1}).toArray().then(array => {
            let response = {
                error: false,
                message: []
            }
            array.forEach(a => {
                const setMonth = monthNumber((new Date(a.date).getUTCMonth() + 1));
                let found = false;
                response.message.map(m => {
                    if(m.month == setMonth) {
                        found = true;
                        if(m.inspections) {
                            m.inspections += 1;
                        } else {
                            m.inspections = 0;
                        }
                    }
                });
                if(!found) {
                    response.message.push({month: setMonth, inspections: 1});
                }
            });
            response.message.reverse();
            res.send(response);
        });
    });

    router.post('/metrics/referals/getall', auth.verifyToken, (req, res) => {
        const referalsTypes = {
            'fb' : 'Facebook' ,
            'tw' : 'Twitter' ,
            'news' : 'Newspaper' ,
            'tvc' : 'TV Commercials' ,
            'sign' : 'Signage / Billboards'
        };
        db.collection("inspections").find({ UserId: req.body.UserId }).limit(100).sort({ date: -1 }).toArray().then(array => {
            let response = {
                error: false,
                message: []
            }
            array.forEach(a => {
                let found = false;
                response.message.map(m => {
                    if (m.type == a.referalsource) {
                        found = true;
                        if (m.referals) {
                            m.referals += 1;
                        } else {
                            m.referals = 0;
                        }
                    }
                });
                if (!found) {
                    response.message.push({ type: a.referalsource, referals: 1, name: referalsTypes[a.referalsource]});
                }
            });
            res.send(response);
        });
    });
}