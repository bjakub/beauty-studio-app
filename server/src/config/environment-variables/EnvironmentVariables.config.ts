import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

const validationSchema = Joi.object({
  DB_HOSTNAME: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validationSchema })],
})
export class EnvironmentVariablesConfig {}
