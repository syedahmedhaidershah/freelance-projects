const { parentPort } = require('worker_threads');
let workerId = 0;

const setWorkerId = (message) => {
    workerId = message;
    parentPort.postMessage({
        topic: 'registered',
        message: `Worker ${workerId} registered`
    });
}

parentPort.on('message', (data) => {
    switch(data.topic) {
        case 'register_self':
            setWorkerId(data.message);
            break;
    }
});
