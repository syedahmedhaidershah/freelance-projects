const { APIError } = require('../exceptions');

/**
 * Error Factory class
 * @typedef ErrorFactory
 */
class ErrorFactory {
  /**
   * Return an error from the passed properties
   * @param {object} errorProperties passed error properties defined in mappings/errors
   * @returns {Error}
   */
  // eslint-disable-next-line class-methods-use-this
  getError(errorProperties) {
    /**
     * If no properties provided, return UNKOWN Error
     */
    if (!errorProperties) {
      return new APIError();
    }

    /**
     * Create Error from Properties
     */
    return new APIError(
      errorProperties.message,
      errorProperties.key,
      errorProperties.statusCode,
      errorProperties.isPublic,
    );
  }
}

/**
 * Export class
 * @typedef ErrorFactory
 */
module.exports = new ErrorFactory();
