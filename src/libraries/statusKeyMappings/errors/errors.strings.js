module.exports = {
  /* Account Related message */
  ACCOUNT_NOT_FOUND: 'No such account exist',
  INVALID_CURRENT_PASSWORD: 'You entered invalid current password',
  ACCOUNT_ALREADY_EXIST: 'An account with this email already exists',
  INVALID_LOGIN_CREDENTIALS: 'Invalid email/password',

  // Jwt
  JWT_EXPIRED: 'Your session has expired',
  JWT_INVALID: 'Your token is invalid',
  JWT_MISSING: 'Authentication token missing',

  // curriculum module
  CURRICULUM_NOT_FOUND: 'Curriculum not found',

  // Finance Module
  TRANSACTION_COMPLETION_FAILED: 'Some error occured during completing transaction',

  // grade module
  GRADE_NOT_FOUND: 'No such grade exist',

  // Lesson Module
  LESSON_NOT_FOUND: 'No such lesson exist',

  // subscription module
  SUBSCRIPTION_NOT_FOUND: 'Subscription not found',

  // subject module
  SUBJECT_NOT_FOUND: 'Subject not found',

  // schedule module
  SCHEDULE_NOT_FOUND: 'Schedule not found',

  // quiz module
  QUIZ_NOT_FOUND: 'Quiz not found',

  // file upload lib
  UPLOAD_FILE_NOT_FOUND: 'File to upload not found',

  // document not found
  DOCUMENT_NOT_FOUND: 'Document not found',

  /* THESE ERRORS SHOULD NEVER SHOW UP ON FRONT-END */
  USER_ROLE_UNDEFINED: 'Undefiled user role passed',
  USER_ROLE_FORBIDDEN_ON_ROUTE: 'You do not have permission to access this route',
  API_NOT_FOUND: 'No such API exist',
  VALIDATION_ERRORS: 'Invalid data passed to system',
  UNKNOWN_FIELD_PROVIDED: 'Unknow field provided',

};
