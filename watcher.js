const nodemon = require('nodemon');

nodemon({
    // script: 'watch-help.js',
    ext: 'js,json,php,css,html'
});

nodemon.on('start', function() {
    console.log('App has started');
}).on('quit', function() {
    console.log('App has quit');
    process.exit();
}).on('restart', function(files) {
    console.log('App restarted due to: ', files);
});