const Aws = require('./aws');
const exceptions = require('./exceptions');
const fileUpload = require('./fileUpload.lib');
const statusKeyMappings = require('./statusKeyMappings');
const generalFunctions = require('./generalFuncs.lib');
// const JwtManager = require('./jwtManager.lib');
// const Mailer = require('./mailer.lib');
// const PaymentGateway = require('./paymentGateways');
const UtilFunctions = require('./utilFunctions.lib');
const Factories = require('./factories');

module.exports = {
  ...exceptions,
  Aws,
  ...fileUpload,
  ...statusKeyMappings,
  generalFunctions,
  // ...JwtManager,
  // ...Mailer,
  // PaymentGateway,
  UtilFunctions,
  Factories,
};
