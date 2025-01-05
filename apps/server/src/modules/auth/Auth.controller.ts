import { Controller, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { Request } from 'express';
import { ZodValidationPipe } from '../../common/pipes/zod-validation/ZodValidation.pipe';
import { LoginEmployeeSchema } from '@repo/types/dto';
import { LocalAuthGuard } from './strategy/local/local.guard';
import { AuthService } from './Auth.service';
import { SkipAuth } from '../../common/metadatas/SkipAuth.metadata';
import { AuthLoginAPI } from '@repo/types/modules';

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
}
