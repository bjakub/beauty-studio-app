import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  CRYPTO_SALT: Joi.number().required(),
});
