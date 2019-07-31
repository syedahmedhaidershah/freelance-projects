module.exports = (io) => {
	io.on('connection', (sock) => {
		console.log('worker connected');
		sock.on('alert', (data) => {
			console.log('here');
			global.runApp().then(() => {
                              fs.readFile('/home/pi/vidulum/still-image.jpg', (err, dat) => {
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
