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
    errorMessages: {
    },
    successMessages: {
    }
}