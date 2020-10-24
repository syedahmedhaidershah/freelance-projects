const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { APIError, ErrorKeys } = require('../libraries');

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new APIError(
        'JWT Missing',
        ErrorKeys.JWT_MISSING.key,
        ErrorKeys.JWT_MISSING.statusCode,
        true,
      );
    }
    jwt.verify(req.headers.authorization, jwtSecret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw new APIError(
            'JWT Token Expired',
            ErrorKeys.JWT_EXPIRED.key,
            ErrorKeys.JWT_EXPIRED.statusCode,
            true,
          );
        }
        throw new APIError(
          'JWT Invalid',
          ErrorKeys.JWT_INVALID.key,
          ErrorKeys.JWT_INVALID.statusCode,
          true,
        );
      }
      if (!req.body) req.body = {};
      req.profile = decoded.profile;
      req.role = decoded.role;
      req.iat = decoded.iat;
      req.exp = decoded.exp;
    });
    next();
  } catch (error) {
    next(error);
  }
};
