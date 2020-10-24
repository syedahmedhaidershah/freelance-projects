const { APIError, ErrorKeys } = require('../libraries');

module.exports = (req, res, next) => {
  try {
    if (!req.role) {
      throw new APIError(
        'User role undefined',
        ErrorKeys.USER_ROLE_UNDEFINED.key,
        ErrorKeys.USER_ROLE_UNDEFINED.httpStatus,
        true,
      );
    }
    if (req.role === 'parent') {
      throw new APIError(
        'User role forbidden',
        ErrorKeys.USER_ROLE_FORBIDDEN_ON_ROUTE.key,
        ErrorKeys.USER_ROLE_FORBIDDEN_ON_ROUTE.httpStatus,
        true,
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
