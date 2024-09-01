import { UsersService } from '../users/Users.service';
import { User } from '@prisma/client';
import { CryptoService } from '../../services/crypto/Crypto.service';
import { omit } from 'lodash';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private cryptoService: CryptoService,
    private jwtService: JwtService,
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

  async login(user: any) {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
