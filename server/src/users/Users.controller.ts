import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './Users.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { PrismaExceptionFilter } from '../../filters/prisma-exception/PrismaException.filter';
import { createUserSchema } from '../../../common/dto/Users';
import { ZodValidationPipe } from '../../pipes/zod-validation/ZodValidation.pipe';

// TODO: Ogarnij tak, zeby pliki z `common` były ogarnianie tutaj :D

@UseFilters(new PrismaExceptionFilter())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private INCLUDE_STATIC: Prisma.UserSelect = {
    email: true,
    role: true,
    name: true,
    id: true,
    surname: true,
    createdAt: true,
  };

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    const users = await this.usersService.findUsers({
      select: this.INCLUDE_STATIC,
    });

    if (users.length === 0) {
      throw new NotFoundException(`No users found`);
    }

    return users;
  }

  @Get('/:id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserModel | null> {
    const user = await this.usersService.findUser({ id }, this.INCLUDE_STATIC);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() data: Prisma.UserCreateInput): Promise<UserModel> {
    return this.usersService.createUser(data, this.INCLUDE_STATIC);
  }
}
