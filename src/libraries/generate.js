const { jwtSecret, jwtExpiresIn } = require('../config');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

/**
 * Generate a signed token
 * @param {(Object|string)} data Object or string to hash
 * @return {Promise} A promise that resolves to the hashed string
 */
module.exports = (data) => {

    // let objToSign = { googleId };
    // if (!(/^[0-9a-zA-Z]{21}$/.test(googleId))) {
    //     Object.assign(objToSign, { emailAddress, });
    //     objToSign = _.omit(objToSign, ['googleId']);
    // }

    return jwt.sign(data, jwtSecret, { expiresIn: jwtExpiresIn });
    //sign JWT
};
