import { UsersService } from '../users/Users.service';
import { CryptoService } from '../../shared/services/crypto/Crypto.service';
import { omit } from 'lodash';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserJwtPayload, UserWithoutPassword } from './Auth.types';
import { RegisterUserDTO } from '@shared/dto/Auth';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findUser({
      email,
    });

    if (user && (await this.cryptoService.compare(password, user.password))) {
      return omit(user, 'password');
    }

    return null;
  }

  async login(user: any) {
    const payload: UserJwtPayload = {
      userId: user.id,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registeredUser: RegisterUserDTO) {
    const user = await this.usersService.findUser({
      email: registeredUser.email,
    });

    if (user) {
      throw new ConflictException('User with specified email already exists!');
    }

    try {
      const hashedPassword = await this.cryptoService.hash(
        registeredUser.password,
      );

      const { id: userId, role } = await this.usersService.createUser({
        email: registeredUser.email,
        password: hashedPassword,
        role: 'USER',
      });

      const payload: UserJwtPayload = {
        userId,
        role,
      };

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
