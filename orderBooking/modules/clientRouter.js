// const identifier = __filename.split('\\').pop().split(/[A-Z]/g)[0];
// const router = global[identifier.concat('Router')];
// const functions = require('./functions/'.concat(identifier).concat('.js'));
const router = global.clientRouter;
const functions = require('../imports/functions/client');

module.exports = (app, io) => {
    
    router.post('/addnew', (req, res) => functions.addNew(req, res));

    router.post('/getone', (req, res) => functions.getOne(req, res));

    router.post('/getall', (req, res) => functions.getAll(req, res));

    router.post('/lastregistered', (req, res) => functions.lastRegistered(req, res));
    
}