import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from '../../services/users/Users.service';
import { AuthFacade } from './Auth.facade';
import { ZodValidationPipe } from '../../pipes/zod-validation/ZodValidation.pipe';
import { loginUserSchema, LoginUserDTO } from '@shared/dto/Auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}
  private readonly authFacade = new AuthFacade(this.usersService);

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(loginUserSchema))
  async login(@Body() credentials: LoginUserDTO): Promise<void> {
    return this.authFacade.signIn(credentials);
  }
}
