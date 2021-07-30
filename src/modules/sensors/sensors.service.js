const { RedisClient } = require('../../libraries');

const SensorStrategy = require('./sensors.strategy');

const { AppData: { business } } = require('../../constants');

const {
    getValue,
    setValue,
} = RedisClient;

const saveSensorData = async (receivedData) => {
    try {
        /**
         * Throttling using 
         * We Enjoy Typing - KISS Strategy for throttling
         * instead of using
         * Dont Repeat Yourself - KISS strategy employing else blocks.
         * This is just for the sake of enhanced performance as provided in the case study.
         * Eventhough the LOC is slightly increased, however a better KISS-simplicity is maintained.
         */
        const { uniqueId, ...data } = receivedData;
        const sensorData = await getValue(uniqueId);

        const timeNow = new Date().getTime();

        if (sensorData) {
            var { requestTimestamps } = JSON.parse(sensorData);

            // if max requests per second threshold has been already achieved
            if (requestTimestamps.length >= business.maxRequestsPerSecond) {
                requestTimestamps.sort();

                const [r1, r2, r3, r4] = requestTimestamps;

                if ((timeNow - r2) < business.acceptableDuration) {
                    return false;
                }
                
                requestTimestamps = [r2, r3, r4, timeNow];
                await setValue(uniqueId, JSON.stringify({ requestTimestamps }));
                return SensorStrategy.saveData(receivedData);
            }

            requestTimestamps.push(timeNow);
            await setValue(uniqueId, JSON.stringify({ requestTimestamps }));
            return SensorStrategy.saveData(receivedData);
        }

        var requestTimestamps = [timeNow];
        await setValue(uniqueId, JSON.stringify({ requestTimestamps }));
        return SensorStrategy.saveData(receivedData);
    } catch (exc) {
        throw exc;
    }
}

module.exports = {
    saveSensorData
}
