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
import { User } from '@prisma/client';
import { AuthService } from './Auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ZodValidationPipe(loginUserSchema))
  async login(@Req() req: Request<{ user: Omit<User, 'password'> }>) {
    return this.authService.login(req.user);
  }
}
