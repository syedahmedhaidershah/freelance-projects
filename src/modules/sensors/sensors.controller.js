const { saveSensorData } = require('./sensors.service');

const { ErrorsFactory } = require('../../factories');
const { Response: response } = require('../../libraries');

const saveData = async (req, res, next) => {
    try {
        const savedData = await saveSensorData(req.body);
        response(res, { savedData });
    } catch (exc) {
        const { Error: { error, status } } = new ErrorsFactory({ message: 'error-occured' });
        response(res, error, status);

        console.log(error.Error);
    }
}

module.exports = {
    saveData
};