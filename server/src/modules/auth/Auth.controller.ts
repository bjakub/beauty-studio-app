import {
  Body,
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
import {
  AuthLoginAPIResponse,
  AuthRegisterAPIResponse,
  LoginUserSchema,
  RegisterUserDTO,
  RegisterUserSchema,
} from '@shared/dto/Auth';
import { LocalAuthGuard } from './strategy/local/local.guard';
import { User } from '@prisma/client';
import { AuthService } from './Auth.service';
import { SkipAuth } from '../../metadatas/SkipAuth.metadata';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ZodValidationPipe(LoginUserSchema))
  async login(
    @Req() req: Request<{ user: Omit<User, 'password'> }>,
  ): Promise<AuthLoginAPIResponse> {
    return this.authService.login(req.user);
  }

  @SkipAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterUserSchema))
  async register(
    @Body() body: RegisterUserDTO,
  ): Promise<AuthRegisterAPIResponse> {
    return this.authService.register(body);
  }
}
