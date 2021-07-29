var jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const response = require('../libraries/response')
module.exports = function verifyToken(req, res, next) {

    if (!req.headers.isstudent) {
        if (!req.headers.authorization) {
            response(res, new Error('Auth Required'), 403)
        } else {
            try {
                var decoded = jwt.verify(req.headers.authorization, jwtSecret);
                if (decoded) {
                    if (!req.body) {
                        req.body = {};
                    }

                    const { emailAddress, googleId } = decoded;
                    req.body.googleId = googleId;
                    if (emailAddress) req.body.emailAddress = emailAddress;
                    req.headers.emailAddress = emailAddress;
                    console.log(req.body.googleId, 'body middleware')
                    console.log(req.body.examId, 'body middleware')

                    next();
                } else {
                    response(res, new Error('Invalid Token'), 403)
                }
            } catch (err) {
                response(res, new Error('jwt expired'), 403)
            }
        }
    } else {
        next();
    }
};