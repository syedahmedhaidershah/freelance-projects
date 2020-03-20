const client =  require('socket.io-client');
const addr = "http://18.222.122.101:9898";

const ct = client.connect(addr);

ct.on('connection', (sock) => {
    console.log('connected');
});

ct.on('location', (data) => {
    console.log(data);
})