module.exports = (worker) => {
    worker.on('message', (msg) => {
        if(msg.type == 'save') {
            global.sps = msg.message;
        } else if (msg.type == 'unlockdoor') {
            // console.log(msg.message);
            const user = msg.message;
            if(global.lastDoorNotif.hasOwnProperty(user.uid)) {
                if((new Date().getTime() - global.lastDoorNotif[user.uid].dt) > 3600000) {
                    global.lastDoorNotif[user.uid].dt = new Date().getTime();
                    io.emit('1000'.concat(user.uid.toString()), {message: { text: "\"".concat(user.username).concat("\" is at the door")}});            
                }    
            } else {
                global.lastDoorNotif[user.uid] = {};
                global.lastDoorNotif[user.uid].dt = new Date().getTime();
                io.emit('1000'.concat(user.uid.toString()), {message: { text: "\"".concat(user.username).concat("\" is at the door")}});            
                
            }
            
            // console.log(user);
        }
     });
    worker.on('error', (err) => { throw err; });
}