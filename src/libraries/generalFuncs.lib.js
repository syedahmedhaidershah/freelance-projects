const fs = require('fs');
const util = require('util');


const functions = {
  /**
     * Promisified FS method
     * @param {string} funct - Requires name of the method of FS to be promisified.
     * @returns {function}
     */
  fsPromise: (funct) => util.promisify(fs[funct]),

  /**
     * Get new empty array of specific length
     * @param {string} length - Length of new array.
     * @returns {Array}
     */
  // eslint-disable-next-line prefer-spread
  getArray: (length) => Array.apply(null, new Array(length)),
};

/**
 * Required Module with optional params
 * @param {string} req - Requires name of the method of function.
 * @param {array} [options] - Arguments if required to be passed to the function
 * @returns {any}
 */
module.exports = (req, options) => {
  let toRet = null;
  try {
    if (options) {
      toRet = functions[req](...options);
    } else {
      toRet = functions[req];
    }
  } catch (exc) {
    if (process.env.NODE_ENV === 'development') {
      console.log(exc);
    }
  }
  return toRet;
};
