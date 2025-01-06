import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { ZodValidationPipe } from '../../common/pipes/zod-validation/ZodValidation.pipe';
import {
  LoginEmployeeSchema,
  VerifyTokenDTO,
  VerifyTokenSchema,
} from '@repo/types/dto';
import { LocalAuthGuard } from './strategy/local/local.guard';
import { AuthService } from './Auth.service';
import { SkipAuth } from '../../common/metadatas/SkipAuth.metadata';
import { AuthLoginAPI, VerifyTokenAPI } from '@repo/types/api';

@SkipAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ZodValidationPipe(LoginEmployeeSchema))
  async login(@Req() req: Request): Promise<AuthLoginAPI> {
    return this.authService.login(req.employee);
  }

  @Post('token/verify')
  @UsePipes(new ZodValidationPipe(VerifyTokenSchema))
  async verifyToken(@Body() body: VerifyTokenDTO): Promise<VerifyTokenAPI> {
    return this.authService.verifyToken(body.token);
  }
}
