connenctedUsers = 0;

module.exports = (app, io) => {
    io.on('connection', (sock) => {
        connenctedUsers++;
        if ((env.environment.dev)) { console.log(`User connected ___ connected users: ${connenctedUsers}`); }
        
        // // FACTORY RELATED TOPICS ////////////////////////////////////////////////////////////////////////
        // sock.on('client/getall', (data) => {
        //     db.collection('clients').find({}).toArray().then(arr => {
        //         io.emit('client/list', arr);
        //     });
        // });

        // // FINISHED PRODUCTS RELATED TOPICS /////////////////////////////////////////////////////////////
        // sock.on('finishedproducts/getall', (data) => {
        //     db.collection('finished_products').find({}).toArray().then(arr => {
        //         io.emit('finishedproducts/list', arr);
        //     });
        // });

        // // RAW MATERIALS RELATED TOPICS /////////////////////////////////////////////////////////////////
        // sock.on('rawmaterials/getall', (data) => {
        //     db.collection('raw_materials').find({}).toArray().then(arr => {
        //         io.emit('rawmaterials/list', arr);
        //     });
        // });
    });
    io.on('disconnect', (sock) => {
        connenctedUsers--;
        if ((env.environment.dev)) { console.log(`User disconnected ___ connected users: ${connenctedUsers}`); }
    })
}