const util = require('util');
const http = require('http');
const socketIo = require('socket.io');
const debug = require('debug')('node-server:index');

// config should be imported before importing any other file
const config = require('./src/config');
const app = require('./src/server');


// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  const server = http.createServer(app);
  const io = socketIo(server);
  global.io = io;
  // initiate socket
  require('./src/socket')(io);

  server.listen(config.port, () => {
    debug(`server started on port ${config.port} (${config.env})`);
  });
}

// module.exports = server;
