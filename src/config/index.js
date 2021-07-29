const path = require('path');
const Joi = require('@hapi/joi');
const dotenv = require('dotenv');

const bullConfig = require('./bull');

const { statics } = require('../config');

const nodeEnvValidator = Joi.string()
  .allow(['development', 'production', 'test', 'provision'])
  .default('development');

// getting environment to load relative .env file
const { error: envError, value } = Joi.validate(process.env, Joi.object({
  NODE_ENV: nodeEnvValidator,
}).unknown().required());
if (envError) {
  throw new Error(`Environment validation error: ${envError.message}`);
}

// require and configure dotenv, will load vars in .env.* file in PROCESS.ENV
const envFilePath = path.resolve(__dirname, '..', '..', `.env.${value.NODE_ENV}`);
const envConfig = dotenv.config({ path: envFilePath });
if (envConfig.error) {
  throw new Error(`Environment file config error: ${envConfig.error}`);
}

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: nodeEnvValidator,
  APP_MODE: Joi.string(),
  PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false),
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  JWT_EXPIRES_IN: Joi.number().default(1440)
    .description('JWT expiration time in seconds'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  SOCKET_IO_REDIS_PORT: Joi.number(),
  REDIS_DB_NO: Joi.number(),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}


const config = {
  appMode: envVars.APP_MODE,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpiresIn: envVars.JWT_EXPIRES_IN,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
  },
  socketIoRedisPort: envVars.SOCKET_IO_REDIS_PORT,
  redisDBNo: envVars.REDIS_DB_NO,
  bullConfig
};

module.exports = config;
