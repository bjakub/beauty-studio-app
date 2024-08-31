import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../../pipes/zod-validation/ZodValidation.pipe';
import { loginUserSchema } from '@shared/dto/Auth';
import { LocalAuthGuard } from './strategy/local/local.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ZodValidationPipe(loginUserSchema))
  async login(@Req() req: Request): Promise<void> {
    console.log('req');
    console.log(req);

    return;
  }
}
