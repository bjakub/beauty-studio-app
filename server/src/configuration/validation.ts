import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DB_HOSTNAME: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
});
