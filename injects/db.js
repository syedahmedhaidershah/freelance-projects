const atob = require('atob');
const constructs = {
    casea : "bW9uZ29hZG1pbg%3D%3D",
    caseb: "QWhtZWQxMjM0LiE%3D",
    casec: "c2Foczk5OTY%3D",
    cased: encodeURIComponent("YWRtaW4=")
}

function hashRev(string){
    return (atob(decodeURIComponent(string)));
}

module.exports = {
    name : 'ams',
    url : 'mongodb://'+hashRev(constructs.casea)+':'+hashRev(constructs.casea)+'@127.0.0.1:27017/admin',
    cloud : 'mongodb://'+hashRev(constructs.casec)+':'+hashRev(constructs.caseb)+'@ds123513.mlab.com:23513/ams'
}