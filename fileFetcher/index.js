const req = require('request');
const fs = require('fs');

let it = 0;

const ends = [
    'https://github.com/web-pal/DBGlass/blob/master/app/styles/fonts/HarmoniaSansMonoStd-Bold.otf?raw=true',
    'https://github.com/web-pal/DBGlass/blob/master/app/styles/fonts/HarmoniaSansMonoStd-Regular.otf?raw=true',
    'https://github.com/web-pal/DBGlass/blob/master/app/styles/fonts/HarmoniaSansMonoStd-Light.otf?raw=true',
    'https://github.com/web-pal/DBGlass/blob/master/app/styles/fonts/HarmoniaSansMonoStd-SemiBd.otf?raw=true',
];

const get = (it) => {
    req.get(ends[it], {}, (e, r, b) => {
        (async() => {
            const fname = ends[it].split('/').pop().split('?')[0];
            await fs.writeFileSync('./'.concat(fname), b);
            console.log(`written ${fname}`);
            if (ends[++it]) {
                get(it);
            }
        })();
    });
}

get(0);