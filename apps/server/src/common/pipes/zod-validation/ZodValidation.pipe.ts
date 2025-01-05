import { PipeTransform, Logger, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ZodException } from '@repo/types/errors';

export class ZodValidationPipe implements PipeTransform {
  private readonly logger = new Logger(ZodValidationPipe.name);

  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      this.logger.error(error);

      throw new BadRequestException(new ZodException(JSON.stringify(error)));
    }
  }
}
