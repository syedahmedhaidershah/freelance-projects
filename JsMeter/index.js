const jm = require('./test.js')

const isPrint = true
const isMs = true // or Second

const m = new jm({ isPrint, isMs })

for (var i = 0; i < 100000000000; i++) {
    Math.random()
}

const meter = m.stop()

console.log('meter: ', meter)