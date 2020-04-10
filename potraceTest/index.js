var potrace = require('potrace'),
    fs = require('fs');

potrace.trace('./map2.png', {
        steps: 20
    },
    (err, svg) => {
        if (err) throw err;
        fs.writeFileSync('./output.svg', svg);
    });