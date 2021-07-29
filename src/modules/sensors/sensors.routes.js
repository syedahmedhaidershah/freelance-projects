const {
    saveData
} = require('./sensors.controller');
const { VerifyToken } = require('../../middlewares');
const { Router } = require('express');

const router = Router();

router
    .post('/savedata', saveData)

module.exports = router;
