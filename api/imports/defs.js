module.exports = {
    errRes: {
        error: true,
        message: 'An unhandled exception occured'
    },
    def: {
        error: false,
        message: 'success'
    },
    msg: (str) => {
        const res = module.exports.def;
        res.message = str;
        return res;
    },
    err: (str) => {
        const res = module.exports.errRes;
        res.message = str;
        return res;
    }
}