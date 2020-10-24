const httpStatus = require('http-status');

/** Template for each type of error in the system */
module.exports = {
  /* Account Related Error Keys */
  ACCOUNT_NOT_FOUND: {
    key: 'ACCOUNT_NOT_FOUND',
    name: 'AccountNotFound',
    statusCode: httpStatus.NOT_FOUND,
  },
  INVALID_CURRENT_PASSWORD: {
    key: 'INVALID_CURRENT_PASSWORD',
    name: 'InvalidCurrentPassword',
    statusCode: httpStatus.FORBIDDEN,
  },
  ACCOUNT_ALREADY_EXIST: {
    key: 'ACCOUNT_ALREADY_EXIST',
    name: 'AccountAlreadyExist',
    statusCode: httpStatus.CONFLICT,
  },
  INVALID_LOGIN_CREDENTIALS: {
    key: 'INVALID_LOGIN_CREDENTIALS',
    statusCode: httpStatus.UNAUTHORIZED,
  },

  // JWT
  JWT_EXPIRED: {
    key: 'JWT_EXPIRED',
    statusCode: httpStatus.UNAUTHORIZED,
  },
  JWT_INVALID: {
    key: 'JWT_INVALID',
    statusCode: httpStatus.UNAUTHORIZED,
  },
  JWT_MISSING: {
    key: 'JWT_MISSING',
    statusCode: httpStatus.UNAUTHORIZED,
  },

  // curriculum module
  CURRICULUM_NOT_FOUND: {
    key: 'CURRICULUM_NOT_FOUND',
    statusCode: httpStatus.NOT_FOUND,
  },

  // finance module
  TRANSACTION_COMPLETION_FAILED: {
    key: 'TRANSACTION_COMPLETION_FAILED',
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
  },
  TRANSACTION_NOT_FOUND: {
    key: 'TRANSACTION_NOT_FOUND',
    statusCode: httpStatus.NOT_FOUND,
  },

  // grade module
  GRADE_NOT_FOUND: {
    key: 'GRADE_NOT_FOUND',
    statusCode: httpStatus.NOT_FOUND,
  },

  // lesson module
  LESSON_NOT_FOUND: {
    key: 'LESSON_NOT_FOUND',
    statusCode: httpStatus.NOT_FOUND,
  },

  // subscription module
  SUBSCRIPTION_NOT_FOUND: {
    key: 'SUBSCRIPTION_NOT_FOUND',
    statusCode: httpStatus.NOT_FOUND,
  },

  // subject module
  SUBJECT_NOT_FOUND: {
    key: 'SUBJECT_NOT_FOUND',
    statusCode: httpStatus.NOT_FOUND,
  },

  // schedule module
  SCHEDULE_NOT_FOUND: {
    key: 'SCHEDULE_NOT_FOUND',
    statusCode: httpStatus.NOT_FOUND,
  },

  // quiz module
  QUIZ_NOT_FOUND: {
    key: 'QUIZ_NOT_FOUND',
    statusCode: httpStatus.NOT_FOUND,
  },

  // file upload lib
  UPLOAD_FILE_NOT_FOUND: {
    key: 'UPLOAD_FILE_NOT_FOUND',
    statusCode: httpStatus.NOT_FOUND,
  },

  // document module
  DOCUMENT_NOT_FOUND: {
    key: 'DOCUMENT_NOT_FOUND',
    statusCode: httpStatus.NOT_FOUND,
  },

  /* THESE ERRORS SHOULD NEVER SHOW UP ON FRONT-END */
  USER_ROLE_UNDEFINED: {
    key: 'USER_ROLE_UNDEFINED',
    statusCode: httpStatus.FORBIDDEN,
  },
  USER_ROLE_FORBIDDEN_ON_ROUTE: {
    key: 'USER_ROLE_FORBIDDEN_ON_ROUTE',
    statusCode: httpStatus.FORBIDDEN,
  },
  API_NOT_FOUND: {
    key: 'API_NOT_FOUND',
    statusCode: httpStatus.NOT_FOUND,
  },
  VALIDATION_ERRORS: {
    key: 'VALIDATION_ERRORS',
    statusCode: httpStatus.BAD_REQUEST,
  },
  UNKNOWN_FIELD_PROVIDED: {
    key: 'UNKOWN_FIELD_PROVIDED',
    statusCode: httpStatus.BAD_REQUEST,
  },

  /* Payment Gateway */
  PAYMENT_GATEWAY_HOOK_SIGNATURE_INVALID: {
    key: 'PAYMENT_GATEWAY_HOOK_SIGNATURE_INVALID',
    statusCode: httpStatus.FORBIDDEN,
  },
  PAYMENT_GATEWAY_HOOK_PARSING_ERROR: {
    key: 'PAYMENT_GATEWAY_HOOK_PARSING_ERROR',
    statusCode: httpStatus.BAD_REQUEST,
  },
  UNEXPECTED_HOOK_EVENT_TYPE: {
    key: 'UNEXPECTED_HOOK_EVENT_TYPE',
    statusCode: httpStatus.BAD_REQUEST,
  },

  /**
   * Approval module
   */
  APPROVAL_NOT_FOUND: {
    key: 'APPROVAL_NOT_FOUND',
    statusCode: httpStatus.NOT_FOUND,
  },
  ACCOUNT_FOR_APPROVAL_NOT_FOUND: {
    key: 'ACCOUNT_FOR_APPROVAL_NOT_FOUND',
    statusCode: httpStatus.NOT_FOUND,
  },

};
