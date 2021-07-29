const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const sensors = require('./modules/sensors/sensors.routes');

/** GET /health-check - zzzCheck service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/sensor', sensors);

module.exports = router;
