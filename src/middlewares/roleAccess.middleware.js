const { APIError, ErrorKeys } = require('../libraries');

module.exports = (roles = []) => (req, res, next) => {
  if (!req.role) {
    throw new APIError(
      'user role undefined',
      ErrorKeys.USER_ROLE_UNDEFINED.key,
      ErrorKeys.USER_ROLE_UNDEFINED.httpStatus,
      true,
    );
  }
  if (!roles.includes(req.role)) {
    throw new APIError(
      'user role forbidden',
      ErrorKeys.USER_ROLE_FORBIDDEN_ON_ROUTE.key,
      ErrorKeys.USER_ROLE_FORBIDDEN_ON_ROUTE.httpStatus,
      true,
    );
  }
  next();
};
