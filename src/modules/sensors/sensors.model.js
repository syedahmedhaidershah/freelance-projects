const mongoose = require('mongoose');
const _ = require('lodash');

const { MongooseValidatorFactories: { EmptyStringOrExactMatch } } = require('../../factories');

const SensorSchema = new mongoose.Schema({
        uniqueId: {
            type: String,
            required: true
        },
        data: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: true,
            updatedAt: true
        },
    }
);

/**
 * Sensor Methods
 */
SensorSchema.methods = {
    safeModel: function (data) {
        return _.omit(this.toObject(), ['_id']);
    }
}

/**
 * Sensor Statics
 */
SensorSchema.statics = {
    async getSensorData(query) {
        try {
            const sensor = await this.findOne(query);
            return sensor;
        } catch (error) {
            throw error;
        }
    },
    async getMultipleSensorsData(query) {
        try {
            const sensors = await this.find(query);
            return sensors;
        } catch (error) {
            throw error;
        }
    },
    async insertSensorData(data) {
        try {
            const inserted = await this.create(data);
            return inserted;
        } catch (error) {
            throw error;
        }
    },
    async insertMultipleSensosrData(data) {
        try {
            const inserted = await this.insertMany(data);
            return inserted;
        } catch (error) {
            throw error;
        }
    }
};

SensorSchema.index({
    uniqueId: -1
}, {
    name: "IDX_User-EmailAddress"
});

/**
 * @typedef Sensor
 */
module.exports = mongoose.model('Sensor', SensorSchema);
