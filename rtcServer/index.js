const app = require('express')();
const bp = require('body-parser');
const cors = require('cors');
const screenshot = require('screenshot-desktop')
const fs = require('fs');
const Datauri = require('datauri');
const datauri = new Datauri();

datauri.on('encoded', content => {
    buffer = content;
});

datauri.on('error', err => console.log(err));

global.buffer = "";

global.cap = () => {
    screenshot().then((img) => {
        global.buffer = 'data:image/jpeg;base64,' + Buffer.from(img).toString('base64');
        global.cap();
    }).catch((err) => {
        console.log(err);
        // ...
    })
}

app.use(bp.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname.concat('/index.html'));
});

app.get('/img', (req, res) => {
    res.send(global.buffer);
})

app.listen(9960, () => {
    console.log(`streamer is live`);
})

global.cap();