const Sensor = require('../modules/sensors/sensors.repository');

const saveDataPorcessor = async (receivedData) => {
    try {
        const { data } = receivedData
        await Sensor.insert(data);
        return true;
    } catch (exc) {
        throw exc;
    }
}

module.exports = saveDataPorcessor;