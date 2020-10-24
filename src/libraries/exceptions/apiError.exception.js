const httpStatus = require('http-status');

class APIError {
  /**
   * Creates an API error.
   * @param {string} message - Error message
   * @param {string} errorKey - Status key for the error
   * @param {number} statusCode - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message, errorKey = 'INTERNAL_SERVER_ERROR', statusCode = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false) {
    // super(message, errorKey, errorKey, statusCode);
    this.message = message;
    this.errorKey = errorKey;
    this.statusCode = statusCode;
    this.isPublic = isPublic;
  }
}

module.exports = APIError;
