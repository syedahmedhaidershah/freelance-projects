const atob = require('atob');
const constructs = {
    casea : "bW9uZ29hZG1pbg%3D%3D",
    caseb: "QWhtZWQxMjM0LiE%3D",
    casec: "c2Foczk5OTY%3D"
}

function hashRev(string){
    return (atob(decodeURIComponent(string)));
}

module.exports = {
    name : 'ds',
    url : 'mongodb://'+hashRev(constructs.casec)+':'+hashRev(constructs.caseb)+'@127.0.0.1:27017/admin',
    cloud : 'mongodb://'+hashRev(constructs.casec)+':'+hashRev(constructs.caseb)+'@ds123513.mlab.com:23513/ams'
}