const defs = require('../imports/defaults');
const errs = defs.errorMessages;
const succ = defs.successMessages;
const queries = require('../imports/queries').items;

module.exports = function (router, mysql) {
    router.post('/getall', (req, res) => {
        mysql.query(queries.getall, (e, r, f) => {
            res.send(defs.setRetRes())
        });
    });
}