// const mongoClient = require('mongodb').MongoClient;
const md5 = require('md5');
const funct = require('../imports/functions');
const defs = require('../imports/defaults');
const qs = require('../imports/queries.js').allottees;
const db = require('../imports/config/db');
const mysqldump = require('mysqldump');
const fs = require('fs');
var xorser = require('file-encryptor');
const machineId = require('node-machine-id').machineId;
const path = require('path');
const mysql_import = require('mysql-import');

async function getMachineId() {
    let id = await machineId({ original: true });
    return id;
}

async function makeADump() {
    // return the dump from the function and not to a file
    await mysqldump({
        connection: db.mysqlconn,
        dumpToFile: './exports/backup.dat',
    });
}

module.exports = (router, mysql, forRoot) => {

    router.post('/getall', (req, res) => {
        mysql.query(qs.getall, (e, r, f) => {
            if (e) {
                console.log(e);
                res.send(defs.errRes);
            } else {
                res.send(defs.msg(r));
            }
        })
    });

    router.post('/getallunallotted', (req, res) => {
        mysql.query(qs.getallunallotted, (e, r, f) => {
            if (e) {
                console.log(e);
                res.send(defs.errRes);
            } else {
                res.send(defs.msg(r));
            }
        })
    });

    router.post('/updatefilebalace', (req, res) => {
        const aid = req.body.aid;

        delete req.body.aid;

        Object.keys(req.body).forEach((k) => {
            const p = req.body[k];
            if (p === '' || p === undefined || p === null) {
                req.body[k] = 0;
            }
        });

        let q = funct.mysqlQueryAlt(mysql, req.body, qs.updateFileBalance);
        q = mysql.format(q, [aid]);

        mysql.query(q, (e, r, f) => {
            if (e) {
                console.log(e);
                res.send(defs.errRes);
            } else {
                res.send(defs.msg('You have successfully updated balance amounts for each of the accounts'));
            }
        });
    });

    router.post('/getfiledata', (req, res) => {
        const query = mysql.format(qs.getfiledata, [req.body.aid]);

        mysql.query(query, (e, r, f) => {
            if (e) {
                console.log(e);
                res.send(defs.errRes);
            } else {
                res.send(defs.msg(r));
            }
        });
    });

    router.post('/updatefiledata', (req, res) => {
        const aid = req.body.aid;
        let alert = false;

        delete req.body.aid;

        Object.keys(req.body).forEach((k) => {
            const p = req.body[k];
            if (p === '' || p === undefined || p === null) {
                alert = true;
            }
        });

        if (alert) {
            res.send(defs.errRes);
        } else {
            let q = funct.mysqlQueryAlt(mysql, req.body, qs.updateFileBalance);
            q = mysql.format(q, [aid]);

            mysql.query(q, (e, r, f) => {
                if (e) {
                    console.log(e);
                    res.send(defs.errRes);
                } else {
                    res.send(defs.msg('You have successfully updated allottee information for this file'));
                }
            });
        }

    });

    router.post('/allotfile', (req, res) => {
        const aid = req.body.aid;
        const q = mysql.format(qs.allotFile, [aid]);

        mysql.query(q, (e, r, f) => {
            if (e) {
                console.log(e);
                res.send(defs.errRes);
            } else {
                const qt = mysql.format(qs.saveAllotmentDate, [req.body.msno, JSON.stringify(req.body)]);

                mysql.query(qt, (e1, r1, f1) => {
                    if (e) {
                        console.log(e);
                        res.send(defs.errRes);
                    } else {
                        res.send(defs.msg('This file has been allotted'));
                    }
                });
            }
        });
    });

    router.post('/changeplotonfile', (req, res) => {
        const newVal = req.body.newVal;
        const oldVal = req.body.file.aid;
        const plot_no = req.body.file.plot_no;

        const q1 = mysql.format(qs.changePlotOnFile, [plot_no, newVal]);

        mysql.beginTransaction((err) => {
            if (err) {
                console.log(e);
                res.send(defs.errRes);
            } else {
                mysql.query(q1, (e, r, f) => {
                    if (e) {
                        return mysql.rollback(() => {
                            console.log(e);
                            res.send(defs.errRes);
                        });
                    } else {
                        const q2 = mysql.format(qs.removePlotFromPrevFile, [oldVal]);

                        mysql.query(q2, (e, r, f) => {
                            if (e) {
                                return mysql.rollback(() => {
                                    console.log(e);
                                    res.send(defs.errRes);
                                });
                            } else {
                                mysql.commit(function (err) {
                                    if (err) {
                                        return mysql.rollback(function () {
                                            console.log(e);
                                            res.send(defs.errRes);
                                        });
                                    } else {
                                        res.send(defs.msg('You have successfully switched this file plot to a file no. '.concat(newVal)));
                                    }
                                });
                            }
                        });
                    }
                })
            }
        });
    });

    router.post('/updatefilenew', (req, res) => {
        const msno = req.body.msno;
        let alert = false;

        delete req.body.msno;

        Object.keys(req.body).forEach((k) => {
            const p = req.body[k];
            if (p === '' || p === undefined || p === null) {
                alert = true;
            }
        });

        if (alert) {
            res.send(defs.err('Please input all of the fields correctly'));
        } else {
            let q = funct.mysqlQueryAlt(mysql, req.body, qs.updateFileNew);
            q = mysql.format(q, [msno]);

            mysql.query(q, (e, r, f) => {
                if (e) {
                    console.log(e);
                    res.send(defs.errRes);
                } else {
                    const qt = mysql.format(qs.updateTimeByMsno, [msno]);

                    mysql.query(qt, (e2, r2, f2) => {
                        if (e2) {
                            console.log(e2);
                            res.send(defs.errRes);
                        } else {
                            res.send(defs.msg('You have successfully assigned a file to a new member'));
                        }
                    });
                }
            });
        }
    });

    router.post('/receivepayment', (req, res) => {
        const key = req.body.type;
        const pending = parseInt(req.body.pending, 10);
        const value = parseInt(req.body.amount, 10);
        const msno = req.body.msno;

        const selector = mysql.format(qs.getPendingPayments, [msno]);

        mysql.query(selector, (e, r, f) => {
            const payments = JSON.parse(r[0].paid);

            payments[key] += value;

            const query = mysql.format(qs.recievePayment, [JSON.stringify(payments), msno]);

            mysql.query(query, (e, r, f) => {
                if (e) {
                    console.log(e);
                    res.send(defs.errRes);
                } else {
                    const obj = {
                        type: key,
                        pending: pending,
                        value: value,
                        msno: msno
                    };

                    const qt = funct.mysqlQuery(mysql, obj, qs.insertPayments);

                    mysql.query(qt, (e1, r1, f1) => {
                        if (e) {
                            console.log(e);
                            res.send(defs.errRes);
                        } else {
                            res.send(defs.msg('You have successfully received payment for a file'));
                        }
                    });
                }
            });
        });

    });

    router.post('/transferfile', (req, res) => {
        const params = req.body;
        const aid = params.aid;


        // const qUp = mysql.format(qs.setFromToO1, [aid, aid]);
        // console.log(qUp);res.send(defs.defRes);return false;

        delete params.aid;

        const qData = mysql.format(qs.getfiledata, [aid]);

        mysql.query(qData, (eq, rq, fq) => {
            if (eq) {
                console.log(eq);
                res.send(defs.errRes);
            } else {
                let query = funct.mysqlQueryAlt(mysql, params, qs.transferQuery);
                query = mysql.format(query, aid);

                mysql.beginTransaction((err) => {
                    if (err) {
                        console.log(e);
                        res.send(defs.errRes);
                    } else {
                        mysql.query(query, (e, r, f) => {
                            if (e) {
                                return mysql.rollback(() => {
                                    console.log(e);
                                    res.send(defs.errRes);
                                });
                            } else {
                                const q2 = mysql.format(qs.shiftOwner, [aid]);

                                mysql.beginTransaction((err) => {
                                    if (err) {
                                        return mysql.rollback(() => {
                                            console.log(e);
                                            res.send(defs.errRes);
                                        });
                                    } else {
                                        mysql.query(q2, (e, r, f) => {
                                            if (e) {
                                                return mysql.rollback(() => {
                                                    console.log(e);
                                                    res.send(defs.errRes);
                                                });
                                            } else {
                                                const q3 = mysql.format(qs.insertPrevFirst, [JSON.stringify(rq[0]), aid]);

                                                mysql.beginTransaction((err) => {
                                                    if (err) {
                                                        return mysql.rollback(() => {
                                                            console.log(e);
                                                            res.send(defs.errRes);
                                                        });
                                                    } else {
                                                        mysql.query(q3, (e, r, f) => {
                                                            if (e) {
                                                                return mysql.rollback(() => {
                                                                    console.log(e);
                                                                    res.send(defs.errRes);
                                                                });
                                                            } else {
                                                                mysql.commit(function (err) {
                                                                    if (err) {
                                                                        return mysql.rollback(function () {
                                                                            console.log(e);
                                                                            res.send(defs.errRes);
                                                                        });
                                                                    } else {
                                                                        const qt = mysql.format(qs.updateTimeByAid, [aid]);

                                                                        mysql.query(qt, (e2, r2, f2) => {
                                                                            if (e2) {
                                                                                console.log(e2);
                                                                                res.send(defs.errRes);
                                                                            } else {
                                                                                const qSave = mysql.format(qs.saveATransfer, [aid, JSON.stringify(params)]);
                                                                                const qGO = mysql.format(qs.getOwnersAid, [aid]);

                                                                                mysql.query(qSave, (e3, r3, f3) => {
                                                                                    if (e3) {
                                                                                        console.log(e3);
                                                                                        res.send(defs.errRes);
                                                                                    } else {
                                                                                        mysql.query(qGO, (e4, r4, f4) => {
                                                                                            if (e4) {
                                                                                                console.log(e4);
                                                                                                res.send(defs.errRes);
                                                                                            } else {
                                                                                                const qUp = mysql.format(qs.setTransferFrom, [r4[0].o1, r3.insertId]);

                                                                                                mysql.query(qUp, (e5, r5, f5) => {
                                                                                                    if (e5) {
                                                                                                        console.log(e5);
                                                                                                        res.send(defs.errRes);
                                                                                                    } else {
                                                                                                        res.send(defs.msg('You have successfully transfered this file'));
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        })
                                                    }
                                                });
                                            }
                                        })
                                    }
                                });
                            }
                        })
                    }
                });
            }
        });
    });

    router.post('/adjustfile', (req, res) => {
        const m1 = req.body.msno;
        const m2 = req.body.toMsno;
        const today = req.body.date;
        const cl = req.body.cl;
        const misc = req.body.misc;
        const int_dev = req.body.int_dev;

        const q1 = mysql.format(qs.getFileDataByMsno, [m1]);

        mysql.query(q1, (e, r, f) => {
            if (e) {
                console.log(e);
                res.send(defs.errRes);
            } else if (r.length > 0) {
                const q2 = mysql.format(qs.getFileDataByMsno, [m2]);

                mysql.query(q2, (err, rows, fields) => {
                    r[0].paid = JSON.parse(r[0].paid);
                    rows[0].paid = JSON.parse(rows[0].paid);

                    r[0].paid.cl -= Math.round(cl / 0.9);
                    r[0].paid.misc -= Math.round(misc / 0.9);
                    r[0].paid.int_dev -= Math.round(int_dev / 0.9);

                    rows[0].paid.cl += Math.round(cl / 0.9);
                    rows[0].paid.misc += Math.round(misc / 0.9);
                    rows[0].paid.int_dev += Math.round(int_dev / 0.9);

                    r[0].paid = JSON.stringify(r[0].paid);
                    rows[0].paid = JSON.stringify(rows[0].paid);

                    const p1 = mysql.format(qs.recievePayment, [r[0].paid, r[0].msno]);
                    const p2 = mysql.format(qs.recievePayment, [rows[0].paid, rows[0].msno]);

                    mysql.query(p1, (e1, r1, f1) => {
                        if (e1) {
                            console.log(e1);
                            res.send(defs.errRes);
                        } else {
                            mysql.query(p2, (e2, r2, f2) => {
                                if (e2) {
                                    console.log(e2);
                                    res.send(defs.errRes);
                                } else {
                                    const useBody = req.body;
                                    useBody.adjust_to = useBody.toMsno;

                                    delete useBody.toMsno;

                                    const adj = funct.mysqlQuery(mysql, useBody, qs.insertAdjustment);

                                    mysql.query(adj, (e3, r3, f3) => {
                                        if (e3) {
                                            console.log(e3);
                                            res.send(defs.errRes);
                                        } else {
                                            res.send(defs.msg('You have succesfully made an adjustment'));
                                        }
                                    });
                                }
                            })

                        }
                    })
                });
            } else {
                console.log(e);
                res.send(defs.errRes);
            }
        });
    });

    router.post('/lastdop', (req, res) => {
        const q = mysql.format(qs.LastDOP, [req.body.msno]);

        mysql.query(q, (e, r, f) => {
            if (e) {
                console.log(e);
                res.send(defs.errRes);
            } else {
                res.send(defs.msg(r));
            }
        });
    });

    router.post('/dateofallotment', (req, res) => {
        const q = mysql.format(qs.dateOfAllotment, [req.body.msno]);

        mysql.query(q, (e, r, f) => {
            if (e) {
                console.log(e);
                res.send(defs.errRes);
            } else {
                res.send(defs.msg(r));
            }
        });
    });

    router.post('/getalltransfers', (req, res) => {
        mysql.query(qs.getAllTransfers, (e, r, f) => {
            if (e) {
                console.log(e);
                res.send(defs.errRes);
            } else {
                res.send(defs.msg(r));
            }
        });
    });

    router.post('/refundfile', (req, res) => {
        const params = req.body;
        params.name = params.file.name;
        params.sowodo = params.file.sowodo;
        params.cnic = params.file.cnic;
        params.file = JSON.stringify(params.file);
        params.payments = JSON.stringify(params.payments);
        params.payable_max = params.payableMax;
        params.deduc_max = params.deducMax;

        delete params.payableMax;
        delete params.deducMax;

        const q1 = funct.mysqlQuery(mysql, params, qs.insertRefund);
        const paidStr = JSON.stringify({ "cl": 0, "misc": 0, "mc": 0, "surcharge": 0, "int_dev": 0, "out_dev": 0, "lease_doc": 0, "wcpr": 0 });
        const q2 = mysql.format(qs.updateRefundedFile, [paidStr, params.msno]);

        mysql.beginTransaction(function (err) {
            if (err) { throw err; }
            mysql.query(q1, function (error, results, fields) {
                if (error) {
                    return mysql.rollback(function () {
                        console.log(error);
                        throw error;
                    });
                }

                mysql.query(q2, function (error, results, fields) {
                    if (error) {
                        return mysql.rollback(function () {
                            console.log(error);
                            throw error;
                        });
                    }
                    mysql.commit(function (err) {
                        if (err) {
                            return mysql.rollback(function () {
                                console.log(err);
                                res.send(defs.errRes);
                                throw err;
                            });
                        }
                        res.send(defs.msg('You have successfully made a refund'));
                    });
                });
            });
        });

    });

    router.post('/getallrefunds', (req, res) => {
        mysql.query(qs.getAllRefunds, (e, r, f) => {
            if (e) {
                console.log(e);
                res.send(defs.errRes);
            } else {
                res.send(defs.msg(r));
            }
        });
    });

    router.post('/getalladjustments', (req, res) => {
        mysql.query(qs.getAdjustmentsProper, (e, r, f) => {
            if (e) {
                console.log(e);
                res.send(defs.errRes);
            } else {
                res.send(defs.msg(r));
            }
        });
    });

    router.post('/backupdatabase', (req, res) => {
        makeADump();

        setTimeout(() => {

            let xorse = null;

            getMachineId().then(guid => {
                fs.writeFile('./exports/guid.txt', guid, (err) => { console.log(err) });

                // xorser.encryptFile('./exports/backup.dat', './exports/backup.dat', guid, (err) => {
                //     if (err) {
                //         console.log(err);
                //         res.send(defs.errRes);
                //     } else {
                // fs.readFile('./exports/backup.dat', (err, dat) => { console.log((new Buffer(dat, 'base64')).toString('utf8')) });
                setTimeout(() => {
                    // console.log((new Buffer(fs.readFileSync('./exports/backup.dat', 'base64').toString(), 'base64')).toString('utf8'));
                    res.sendFile(path.join(forRoot, '/exports/backup.dat'));
                }, 899);
                // }
                // });
                // xorse = new Cryptr(guid);
                // fs.readFile('./exports/backup.dat', (err, buff) => {
                //     if (err) {
                //         console.log(err);
                //         res.send(defs.errRes);
                //     } else {
                //         const literal = buff.toString();

                //         const xorsed = xorse.encrypt(literal);

                //         fs.writeFile('./exports/dump.txt', xorsed, (err) => {
                //             if (err) {
                //                 console.log(err);
                //                 res.send(defs.errRes);
                //             } else {
                //                 res.set('Content-Type', 'text/plain');
                //                 res.sendFile(path.join(forRoot, '/exports/dump.txt'));
                //             }
                //         });
                //     }
                // });
            }, 2500);
        });

    });

    router.post('/importdatabase', (req, res) => {
        const buff = (new Buffer(req.body.value, 'base64')).toString('utf8');

        setTimeout(() => {

            let xorse = null;

            getMachineId().then(guid => {

                fs.writeFile('./exports/temp.sql', buff, (err) => {
                    if (err) {
                        console.log(err);
                        res.send(defs.errRes);
                    } else {
                        mysql_import.config({
                            host: db.mysqlconn.host,
                            user: db.mysqlconn.user,
                            password: db.mysqlconn.password,
                            database: db.mysqlconn.database,
                            onerror: err => console.log(err.message)
                        }).import('./exports/temp.sql').then(() => {
                            res.send(defs.msg('DB successfully imported'));
                            setTimeout(() => {
                                fs.unlink('./exports/temp.sql', (err) => { if (err) console.log(err); });
                            }, 1000);
                        });
                    }
                    //     xorser.decryptFile('./exports/temp.sql', './exports/use.sql', guid, (err) => {
                    //         if (err) {
                    //             console.log(err);
                    //             res.send(defs.errRes);
                    //         } else {
                    //             fs.readFile('./exports/use.sql', (err, dat) => {
                    //                 if (err) {
                    //                     console.log(err);
                    //                     res.send(defs.errRes);
                    //                 } else {
                    //                     console.log(dat);
                    //                 }
                    //             })
                    //         }
                    //     });
                    // }
                });

            }, 2500);
        });
    });

}