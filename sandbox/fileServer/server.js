const express = require('express');
const app = express();
const bp = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(cors());
app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('*', (req, res) => {
    // res.sendStatus(200);
    // console.log(path.join(__dirname, req.url.split(/\//)[1]));
    try {
        const fileName = 'req.url.split(/\//)[1]';
        const usePath = path.join(__dirname, );
        if (!(fs.exists(usePath))) {
            res.setHeader('Content-Encoding', 'gzip');
            fs.createReadStream(usePath).pipe(zlib.createGzip()).pipe(res);
            // res.sendFile(usePath1
        } else {
            res.type('text/html');
            res.sendFile('<script>window.location="/";<script>');
        }
    } catch (exc) {
        const usePath = path.join(__dirname, 'index.html');
        res.setHeader('Content-Encoding', 'gzip');
        fs.createReadStream(usePath).pipe(zlib.createGzip()).pipe(res);
        // res.sendFile(path.join(__dirname, 'index.html'));

    }

});

app.listen(9860, () => {
    console.log('live');
})