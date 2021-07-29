const { ErrorsFactory } = require('../factories');

const { Errors: { types: errorTypes } } = require('../constants');

module.exports = function response(res, data, code) {
    try {
        const { name, message } = data;
        if (name && errorTypes.includes(name)) {
            if (code) {
                res.status(code);
                return res.json(message);
            }
            res.status(200);
            return res.json(message);
        }

        res.json(message)
    } catch (exc) {
        const { Error: { error, status } } = new ErrorsFactory({ message: 'error-occured' });
        res.status(status);
        res.send(error);

        console.log(error.Error);
    }
}