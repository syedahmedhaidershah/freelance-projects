const http = require('http');
const https = require('https');

const fetch = (uri, options = {}, useSecure) => {
    const { method = 'get' } = options;

    let useModule = useSecure ? https : http;

    return new Promise((resolve, reject) => {
        let data = '';

        useModule[method](
            uri,
            options,
            (res) => {
                res.on('error', (...args) => {
                    reject(...args);
                });

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', (...args) => {
                    const resolvedData = data.toString();

                    resolve(resolvedData);
                })
            }
        )
    });
}

module.exports = {
    fetch
}