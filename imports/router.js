module.exports = (router) => {
    router.get('/halleffect', (req, res) => {
        // console.log(req.params);
	const q = req.query;
        global.reading = (q.reading) ? q.reading : 0;
	global.coords = (q.lat && q.lng) ? {lat: q.lat, lng: q.lng} : {lat: '24.941450', lng: '67.069405'};
        res.sendStatus(200);
    });
	router.get('/img', (req, res) => {
		res.sendFile('/home/ubuntu/vidulum/img/1.jpg');
	});

	router.get('/imgs', (req,resp) => {
		drive.files.list({
    pageSize: 20,
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) {  resp.send(err); return console.log('The API returned an error: ' + err);}
	let f =[];
    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      f = files.map((file) => {
        return `${file.name} (${file.id})`;
      });
    } else {
      console.log('No files found.');
    }
	files.forEach(file => {
	//console.log(drive.files.get);
		const x = drive.files.get({
			fileId: file.id,
			alt: 'media'
		})
//		.on('end', (r) => {console.log(r);})
//		.on('error', err => {console.log(err);})
	});
//.pipe((dat) => console.log(dat));
	console.log(x);
	resp.sendStatus(200);
  });
	});

}
