connenctedUsers = 0;

module.exports = (app, io) => {
    io.on('connection', (sock) => {
        connenctedUsers++;
        if ((global.env.environment.dev)) { console.log(`User connected ___ connected users: ${connenctedUsers}`); }
        
        // FACTORY RELATED TOPICS ////////////////////////////////////////////////////////////////////////
        sock.on('client/getall', (data) => {
            db.collection('clients').find({}).toArray().then(arr => {
                io.emit('client/list', arr);
            });
        });

    });
    io.on('disconnect', (sock) => {
        connenctedUsers--;
        if ((global.env.environment.dev)) { console.log(`User disconnected ___ connected users: ${connenctedUsers}`); }
    })
}