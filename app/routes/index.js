const path = require('path');
var fs = require('fs');

module.exports = function(app, root){
    app.get('/', (req,res) => {
        res.sendFile(path.join(root, 'www/index.html'));
    });
    
    app.get('/panel', (req,res) => {
        res.sendFile(path.join(root, 'www/panel/index.html'));
    });

    app.get('/dev', (req,res) => {
        fs.readFile(path.join(root, "sandbox/lenna.png"), (err, data) => {
            data = new Buffer(data).toString('base64');
            res.send(data);
        });
    });
    app.post('/dev', (req, res) => {
        fs.readFile(path.join(root, "sandbox/lenna.png"), (err, data) => {
            data = new Buffer(data).toString('base64');
            res.send(data);
        });
    });

    app.post('/getreport',(req,res) => {
        res.sendFile(path.join(root, 'sandbox/report.xlsx'));
    })
    app.get('*', (req, res) => {
        let urlparts = req.url.split(".");
        if (fs.existsSync(path.join(root, req.url))) {
            res.setHeader("Content-Type", "text/"+urlparts[ urlparts.length - 1 ]);
            res.sendFile(path.join(root, req.url));    
        } else {
            res.send('501. access forbidden.');
        }
    });
}