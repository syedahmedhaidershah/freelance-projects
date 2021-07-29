const SensorModel = require('./sensors.model');

class Sensor {
    #sensor;

    constructor(uniqueId, data) {
        if (uniqueId && data)
            this.#sensor = new SensorModel({
                uniqueId,
                data
            });
    }

    static find = async (query, options) => {
        if (options)
            var { many } = options;

        if (many) {
            const sensorData = await SensorModel.getMultipleSensorsData(query);
            return sensorData;
        }

        const sensorsData = await SensorModel.getSensorData(query);
        return sensorData;
    }

    static insert = async (data) => {
        if (Array.isArray(data)) {
            const insertedSensors = await SensorModel.insertMultipleSensosrData(data);
            return insertedSensors;
        }

        const insertedSensor = await SensorModel.insertSensorData(data);
        return insertedSensor;
    }
}

module.exports = Sensor