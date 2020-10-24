const cacheSock = require('./modules/cache/cache.socket');

module.exports = (io) => {
  io.on('connection', (socket) => cacheSock(io, socket));
};
