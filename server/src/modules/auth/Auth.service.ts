import { UsersService } from '../users/Users.service';
import { User } from '@prisma/client';
import { CryptoService } from '../../services/crypto/Crypto.service';
import { omit } from 'lodash';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private cryptoService: CryptoService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findUser({
      email,
    });

    if (user && (await this.cryptoService.compare(password, user.password))) {
      return omit(user, 'password');
    }

    return null;
  }

  async register(_user: User): Promise<void> {
    // const newUser: User = { ...user, password: hashedPassword };

    // const createdUser = await this.usersService.createUser(newUser);

    return;
  }
}
