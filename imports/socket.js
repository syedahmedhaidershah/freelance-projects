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
            // console.log(data);
            const folderId = '17_a6ALC6a2dVk06Dcgb_lwk_J-CEgoVg'
            fs.writeFileSync('./img/1.jpg', data);
            const fileMetadata = {
                'name': (new Date().toString()).concat('jpg'),
                parents: [folderId]
            };
            const media = {
                mimeType: 'image/jpeg',
                body: fs.createReadStream('./img/1.jpg')
            };
            drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id'
            }, function (err, file) {
                if (err) {
                    // Handle error
                    console.error(err);
                } else {
                    console.log(file);
                    console.log('File Id: ', file.id);
                }
            });
        });

        socket.on('userpresent', (data) => {
            console.log(data);
        })
    });
}