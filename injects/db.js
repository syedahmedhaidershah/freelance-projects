const atob = require('atob');
const constructs = {
    casea : "c2Foczk5OTY%3D",
    caseb : "QWhtZWQxMjM0LiE%3D"
}

function hashRev(string){
    return (atob(decodeURIComponent(string)));
}

module.exports = {
    name : 'ams',
    url : 'mongodb://'+hashRev(constructs.casea)+':'+hashRev(constructs.caseb)+'@127.0.0.1/admin',
    cloud : 'mongodb://'+hashRev(constructs.casea)+':'+hashRev(constructs.caseb)+'@ds123513.mlab.com:23513/ams'
}