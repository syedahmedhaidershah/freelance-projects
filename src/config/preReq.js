/** Third party dependencies */
const Bluebird = require('bluebird'); // eslint-disable-line no-global-assign
const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('node-server:index');

/**
 * Pre requisite functions and configuration for application / web-server
 * @property {*} app - Express App
 * @property {*} config - Configuration object for applications
 * @returns {void}
 */
module.exports = (app, config) => {
    /** Global available definition for root
     * Though a bad practice, but boiler plate strategy for testing.
     */
    global['root'] = __dirname

    /**
     * Replacing promise by Bluebird
     */
    Object.assign(
        Promise.prototype,
        Bluebird
    );

    const {
        mongo: { host: mongoHost },
        mongooseDebug,
        port,
        socketIoRedisPort,
    } = config;


    // plugin bluebird promise in mongoose
    mongoose.Promise = Promise;

    // connect to mongo db
    const mongoUri = mongoHost;

    mongoose.connect(mongoUri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        promiseLibrary: Promise,
    });

    mongoose.connection.on('error', () => {
        throw new Error(`unable to connect to database: ${mongoUri}`);
    });

    // print mongoose logs in dev env
    if (mongooseDebug) {
        mongoose.set('debug', (collectionName, method, query, doc) => {
            debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
        });
    }
}