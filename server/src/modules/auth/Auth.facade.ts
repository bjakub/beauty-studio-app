import { User } from '@prisma/client';
import { UsersService } from '../../services/users/Users.service';
import { UnauthorizedException } from '@nestjs/common';

export class AuthFacade {
  constructor(private usersService: UsersService) {}
  async signIn(email: string, password: string): Promise<User> {
    const user = await this.usersService.findUser({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
