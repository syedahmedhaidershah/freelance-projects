const express = require('express');
const bp = require('body-parser');
const cors = require('cors');

app = express();

let state = 0;

app.use(bp.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    console.log('state requested', state);
    // res.send((Math.random() * 100).toFixed(0).toString());
    res.send({state: state});
});

app.post('/', (req, res) => {
    console.log('state requested', state);
    // res.send((Math.random() * 100).toFixed(0).toString());
    res.send({state: state});
});

app.get('/trigger', (req, res) => {
    console.log('before ',state);
    // res.send((Math.random() * 100).toFixed(0).toString());
    state = (state == 0) ? 1 : 0;
    console.log('triggered state > ', state);
    res.send({state: state});
});

app.post('/trigger', (req, res) => {
    console.log('before ',state);
    // res.send((Math.random() * 100).toFixed(0).toString());
    state = (state == 0) ? 1 : 0;
    console.log('triggered state > ', state);
    res.send({state: state});
});

app.listen(80, () => {
    console.log('app is live');
});