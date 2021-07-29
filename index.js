/** Setting off Express Application Handling App */
const app = require('./src/server');

/** Application prerequisite startup functions & Config integration */
const preReq = require('./src/config/preReq');    /** Application Statics */
const appConfig = require('./src/config');

preReq(app, appConfig);

app.listen(appConfig.port, () => {});

// smtpsrvr.listen(25);
