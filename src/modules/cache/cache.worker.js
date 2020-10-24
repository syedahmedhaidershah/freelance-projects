const { parentPort } = require('worker_threads');
const buffer = {};

parentPort.on('message', (message) => {
    const {
        topic,
        data
    } = message;

    switch (topic) {
        case 'getall':
            console.log(buffer);
            parentPort.postMessage({
                topic: 'getall',
                data: buffer
            })
            break;
        case 'store':
            let {
                key,
                value
            } = data;
            buffer[key] = value;
            parentPort.postMessage({
                topic: 'store',
                data
            })
            break;

        case 'remove':
            let {
                keyR
            } = data;
            delete buffer[keyR];
            parentPort.postMessage({
                topic: 'remove',
                data
            })
            break;

        case 'clear':
            buffer = {};
            parentPort.postMessage({
                topic: 'clear',
            })
            break;
        default:
            break;
    }
});