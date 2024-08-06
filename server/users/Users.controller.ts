import { Controller, Post, UseFilters } from '@nestjs/common';
import { UsersService } from './Users.service';
import { User as UserModel } from '@prisma/client';
import { PrismaExceptionFilter } from '../filters/prisma-exception/PrismaException.filter';

@UseFilters(new PrismaExceptionFilter())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(): Promise<UserModel> {
    return this.usersService.createUser({
      email: 'jakub.bialecki1@gmail.com',
      password: 'abcd',
      role: 'ADMIN',
    });
  }
}
