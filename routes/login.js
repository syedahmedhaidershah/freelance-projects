// const mongoClient = require('mongodb').MongoClient;
const md5 = require('md5');
const funct = require('../imports/functions');
const defs = require('../imports/defaults');
const loginQuery = require('../imports/queries.js').login;

const loginDefErr = 'Could not log you in at the moment. Please try again in a while';
const invalidLoginfErr = 'The credentials provided are incorrect';


module.exports = (router, mysql) => {

    router.post('/login', (req, res) => {
        const query = req.body;
        query.password = md5(query.password);

        const loginGeneratedQuery = mysql.format(loginQuery.read, Object.values(query));

        if (loginGeneratedQuery) {
            mysql.query(
                loginGeneratedQuery
                , (error, results, fields) => {
                    if (error) {
                        console.log(error);
                        res.send(defs.setRetRes('err', loginDefErr));
                    } else {
                        if (results.length > 0) {
                            res.send(defs.setRetRes('def', results));
                        } else {
                            res.send(defs.setRetRes('err', invalidLoginfErr));
                        }
                    }
                });
        } else {
            res.send(defs.setRetRes('err', invalidLoginfErr));
        }
    });

}