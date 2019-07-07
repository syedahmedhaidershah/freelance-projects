// const mongoClient = require('mongodb').MongoClient;
const md5 = require('md5');
const funct = require('../imports/functions');
const defs = require('../imports/defaults');
const qs = require('../imports/queries.js').owners;

module.exports = (router, mysql) => {

    router.post('/getprev', (req, res) => {
        const query = mysql.format(qs.get, [req.body.aid]);

        mysql.query(query, (e,r,f) => {
            if(e) {
                console.log(e);
                res.send(defs.errRes);
            } else {
                res.send(defs.msg(r));
            }
        })
    });

}