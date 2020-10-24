const {
    getAll,
    store,
    remove,
    clear
} = require('./cache.controller');

module.exports = (io, socket) => {
    socket.on('getall', getAll);
    socket.on('store', store);
    socket.on('remove', remove);
    socket.on('clear', clear);
};
