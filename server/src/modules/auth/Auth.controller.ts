import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { ZodValidationPipe } from '../../pipes/zod-validation/ZodValidation.pipe';
import { loginUserSchema } from '@shared/dto/Auth';
import { LocalAuthGuard } from './strategy/local/local.guard';
import { AuthFacade } from './Auth.facade';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor() {}

  private readonly authFacade = new AuthFacade();

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ZodValidationPipe(loginUserSchema))
  async login(
    @Req() req: Request<{ user: Omit<User, 'password'> }>,
  ): Promise<void> {
    return this.authFacade.signIn(req.user as Omit<User, 'password'>);
  }
}
