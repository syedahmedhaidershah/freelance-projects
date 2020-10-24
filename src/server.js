const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const { ValidationError } = require('express-validation');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const routes = require('./routes');
const config = require('./config');
const { APIError, ErrorKeys } = require('./libraries');

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json({
  // We need the raw body to verify webhook signatures.
  // Let's compute it only when hitting the Stripe webhook endpoint.
  verify: function (req, res, buf) {
    req.rawBody = buf.toString();
  },
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(cookieParser());
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount all routes on /api path
app.use('/api', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  let finalError = err;
  console.log(err);
  // need to be fixed
  if (finalError instanceof ValidationError) {
    // if (finalError.details.body) {
    //   finalError = finalError.details.body.map((msg) => msg.message);
    // } else if (finalError.details.query) {
    //   finalError = finalError.details.query.map((msg) => msg.message);
    // }
    // finalError = new APIError(finalError.toString(), finalError.statusCode, true);
    finalError = new APIError(
      'Validation Error occured',
      ErrorKeys.VALIDATION_ERRORS.key,
      ErrorKeys.VALIDATION_ERRORS.statusCode,
      true,
    );
    finalError.message = err.message;
  }
  if (!(finalError instanceof APIError)) {
    const apiError = new APIError(
      'Some Problem occured',
      finalError.errorKey,
      finalError.statusCode,
      true,
    );
    finalError.message = err.message;
    return next(apiError);
  }
  return next(finalError);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError(
    'API not found',
    ErrorKeys.API_NOT_FOUND.key,
    ErrorKeys.API_NOT_FOUND.statusCode,
    true,
  );
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.statusCode || 500).json({
    message: err.message,
    error: true,
    errorKey: err.errorKey,
    stack: config.env === 'development' ? err.stack : {},
  });
});

module.exports = app;
