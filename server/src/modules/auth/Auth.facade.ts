import { UsersService } from '../../services/users/Users.service';
import { UnauthorizedException } from '@nestjs/common';
import { LoginUserDTO } from '@shared/dto/Auth';

export class AuthFacade {
  constructor(private usersService: UsersService) {}
  async signIn(credentials: LoginUserDTO): Promise<void> {
    const { email, password } = credentials;

    // TODO: hash password and pass to service

    const hashedPassword = password;

    const user = await this.usersService.findUser({
      email,
      password: hashedPassword,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    console.log('user');
    console.log(user);

    // TODO: Generate JWT and return here

    return;
  }
}
