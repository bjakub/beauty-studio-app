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
import { ZodValidationPipe } from '../../common/pipes/zod-validation/ZodValidation.pipe';
import { AuthLoginAPIResponse, LoginEmployeeSchema } from '@shared/dto/Auth';
import { LocalAuthGuard } from './strategy/local/local.guard';
import { AuthService } from './Auth.service';
import { SkipAuth } from '../../common/metadatas/SkipAuth.metadata';

@SkipAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ZodValidationPipe(LoginEmployeeSchema))
  async login(@Req() req: Request): Promise<AuthLoginAPIResponse> {
    return this.authService.login(req.employee);
  }
}
