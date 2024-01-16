import Joi from 'joi';
import { config } from 'dotenv';

if (!process.env.NODE_ENV) {
  config({ path: '.env.local' });
}

// All the environment variables used by the app should be defined here.

// To define new env:
// 1. Add env variable to .env.local file;
// 2. Provide validation rules for your env in envsSchema;
// 3. Make it visible outside of this module in export section;
// 4. Access your env variable only via config file.
// Do not use process.env object outside of this file.

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'integration', 'development')
      .required(),
    PORT: Joi.number().default(8080),
    JWT_SECRET: Joi.string().required(),
  })
  .unknown(true);

const { value: envVars, error } = envSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${JSON.stringify(error.details)}`);
}

// map env vars and make it visible outside of this module
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
};
