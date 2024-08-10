import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from '../../services/users/Users.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { createUserSchema } from '@shared/dto/Users';
import { ZodValidationPipe } from '../../pipes/zod-validation/ZodValidation.pipe';
import { UsersFacade } from './Users.facade';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private readonly usersFacade = new UsersFacade(this.usersService);

  private USER_SELECT: Prisma.UserSelect = {
    email: true,
    role: true,
    name: true,
    id: true,
    surname: true,
    createdAt: true,
  };

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.usersFacade.getAllUsers();
  }

  @Get('/:id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserModel | null> {
    return this.usersFacade.getUserById(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() data: Prisma.UserCreateInput): Promise<UserModel> {
    return this.usersService.createUser(data, this.USER_SELECT);
  }
}
