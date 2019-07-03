const config = require('./imports/config');
const client = require('socket.io-client');

client.connect(config.uri);