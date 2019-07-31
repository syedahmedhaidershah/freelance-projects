const fs = require('fs');

let connectedUsers = 0;

let gb = null;

module.exports = (io) => {
//	io.on('disconnect', (sock) => {
//		if(gb) {
//			clearInterval(gb);
//		}
//	});
	
      gb = setInterval(() => {
              io.emit("location", global.coords);
              console.log("broadcasting", global.coords);
      }, 1500);

    io.on('connection', (socket) => {
        connectedUsers++;
	
//	gb = setInterval(() => {
//		io.emit("location", global.coords);
//		console.log("broadcasting", global.coords);
//	}, 1500);

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
            global.userpresent = data;

	console.log(global.userpresent, global.reading);

            if(!(global.userpresent) && global.reading > 900) {
		console.log('alerted');
               io.emit('alert', {});
            }
        })
    });
}
