import { NotFoundException } from '@nestjs/common';
import { User } from '.prisma/client';
import { UsersService } from './Users.service';
import { Prisma } from '@prisma/client';
import { CryptoService } from '../../services/crypto/Crypto.service';

export class UsersFacade {
  private readonly USER_SELECT: Prisma.UserSelect = {
    email: true,
    role: true,
    name: true,
    id: true,
    surname: true,
    createdAt: true,
  };

  constructor(
    private usersService: UsersService,
    private cryptoService: CryptoService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.findUsers({
      select: this.USER_SELECT,
    });

    if (users.length === 0) {
      throw new NotFoundException(`No users found`);
    }

    return users;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.usersService.findUser({ id }, this.USER_SELECT);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await this.cryptoService.hash(user.password);
    const newUser = { ...user, password: hashedPassword };

    return this.usersService.createUser(newUser, this.USER_SELECT);
  }
}
