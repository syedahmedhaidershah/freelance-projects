var FingerPrint = require("zfm20"),
    sensor;
 
 
sensor = new FingerPrint();
 
sensor.connect({
    port 		: "/dev/ttyUSB0",
    baudrate 	: 57600,
});
 
sensor.on("ready", function(){
 
    sensor.read()
    .ok(function(id){
        console.log("Fingerprint found! ID",id);
    })
    .fail(function () {
        console.log("Unknown fingerprint");
    })
    .wait(function(){
        console.log("Put fingerprint");
    });
 
});