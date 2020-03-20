const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const request = require('request');

let fCount = 0;

app.use(bodyParser.json());
app.use(cors());

app.post('*', (req, res) => {
    const href = req.body.href;
    const ext = (req.body.href.match(/(png)/g)) ? 'png' : 'jpg';
    request(href, function (error, response, body) {
        fs.writeFileSync(`./files/${fCount++}.${ext}`,  Buffer.from(body), 'base64', (err) => {console.log(err)});
        require('process').exit();
    });
    res.send('OK');
});

app.listen(9898, () => { });