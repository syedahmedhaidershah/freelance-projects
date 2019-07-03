const fs = require('fs');

let connectedUsers = 0;

module.exports = (io) => {
    io.on('connection', (socket) => {
        connectedUsers++;
        console.log(`connected Users: ${connectedUsers}`);

        socket.on('disconnect', () => {
            connectedUsers--;
            console.log(`connected Users: ${connectedUsers}`);
        });

        socket.on('image', (data) => {
            let ext = '';

            const pngReg = 'data:image/png;base64,';
            const jpReg = 'data:image/jpg;base64,';
            const jpReg2 = 'data:image/jpeg;base64,';

            ext = ((new RegExp(pngReg)).test(data.image)) ? 'png' : ext;
            ext = ((new RegExp(jpReg)).test(data.image)) ? 'jpg' : ext;
            ext = ((new RegExp(jpReg2)).test(data.image)) ? 'jpeg' : ext;
        });
    });
}