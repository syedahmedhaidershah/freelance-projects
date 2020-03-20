module.exports = (worker, id) => {
    worker.postMessage({topic: "register_self", message: id.toString()});
    
    worker.on('message', msg => {
        switch(msg.topic) {
            case 'registered':
                if(global.env.environment.dev) console.log(msg.message);
                break;
        }
    })
}