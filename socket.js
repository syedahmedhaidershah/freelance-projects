module.exports = (io) => {
	io.on('connection', (sock) => {
		console.log('worker connected');
		sock.on('alert', (data) => {
			global.runApp().then(() => {
                              fs.readFile('still-image.jpg', (err, dat) => {
                                      if(err) return console.log(err);
                                      global.io.emit('image',dat);
                              });
                      });

		});
	});
	io.on('disconnect', (sock) => {
		console.log('worker disconnected');
	});
}
