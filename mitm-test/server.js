const mitm = require('mitm')();
const Http = require('http');

// mitm.on("connection", function (socket) { socket.write("Hello back!") })

mitm.on("request", function (req, res) {
    res.statusCode = 402
    res.end("Pay up, sugar!")
})

Http.get("http://www.google.com", function (res) {
    res.setEncoding("utf8")
    res.statusCode // => 402
    res.on("data", console.log) // => "Pay up, sugar!"
})