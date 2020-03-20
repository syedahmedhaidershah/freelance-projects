// requring filesystem module
const fs = require('fs');
// requiring os module
const os = require('os');
// requiring Worker from worker_threads module
const { Worker } = require('worker_threads');

const str = 'ahmed';

module.exports = {    
    defRes: {
        error: false,
        message: 200
    },
    errRes: {
        error: true,
        message: 'An unhandled exception occured, please contact your administrator.'
    },
    err(str) {
        let thisRes = module.exports.errRes;
        thisRes.message = str;
        return thisRes;
    },
    msg(str) {
        let thisRes = module.exports.defRes;
        thisRes.message = str;
        return thisRes;
    },
    setRetRes: (type, msg) => {
        let thisRes = module.exports.defRes;
        if (type == 'err') {
            thisRes = module.exports.errRes;
        }
        thisRes.message = msg;
        return thisRes;
    },
    requireAll: (path, app, io) => {
        // reading filesystem for the provided path
        fs.readdir(
            `./${path}`,
            (err, files) => {
                if (err) return console.log(err);
                
                files.forEach(file => {
                    require(`../${path}/`.concat(file))(app, io);
                });
            });
    },

    setGlobals: () => {
        global.env = require('./config/env');
        global.db = null;
    },
    initWorkers: async () => {
        // getting count of logical processors / available threads
        const cpuCount = os.cpus().length;
        for (cpu = 1; cpu <= cpuCount; cpu++) {

            // creating a worker one for each cpu

            const wString = 'worker'.concat(cpu.toString()); // eg worker1
            const fName = 'workers/'.concat(wString).concat('.js') // eg modules/worker1.js
            const exists = fs.existsSync(fName);

            if (exists) {
                if (global.env.environment.dev) console.log(`registering worker ${cpu}`);

                // creating a new worker
                global[wString] = await new Worker('./'.concat(fName)); // eg ./modules/worker1.js

                // creating a handler for this worker
                global['worker_handler'.concat(cpu.toString())] = await require(`../workerHandlers/worker${cpu.toString()}.js`)(global[wString], cpu);
                // eg '../workerHandlers/worker1.js
            }
        }
    }
}