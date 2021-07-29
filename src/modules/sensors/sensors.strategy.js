const QueueFactory = require('../../factories/queue.factory');

const { sensorProcessor } = require('../../jobs');
const { bullConfig } = require('../../config');

/**
 * Sensor Strategy
 */
class SensorsStrategy {

    static saveSensorsDataQueue = null;

    static async saveData(data) {
        let { queueOptions, jobOptions, concurrency } = bullConfig;

        if (!SensorsStrategy.saveSensorsDataQueue) {
            SensorsStrategy.saveSensorsDataQueue = QueueFactory('saveDataQueue', queueOptions, sensorProcessor, concurrency);
        }

        SensorsStrategy.saveSensorsDataQueue.add(data, jobOptions);
        return true;
    }

}

module.exports = SensorsStrategy;

