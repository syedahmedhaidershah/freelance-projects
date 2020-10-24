const fs = require('fs');
const AWS = require('aws-sdk');
const config = require('../../config/index');

/**
 * Returns AWS modules in a single object
 */
module.exports = () => {
  AWS.config.update({
    accessKeyId: config.awsS3UserKey, secretAccessKey: config.awsS3UserSecret,
  });
  const modules = {};
  fs
    .readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'config.js'))
    .forEach((file) => {
      const cd = file.split('.')[0];
      // eslint-disable-next-line import/no-dynamic-require
      modules[cd] = require(`./${file}`)(AWS, config); // eslint-disable-line global-require
    });

  return modules;
};
