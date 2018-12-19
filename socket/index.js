module.exports = function(io, db) {
    io.on('connection', (socket) => {
        console.log("User connected");
    });
}