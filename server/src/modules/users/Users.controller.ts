import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './Users.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { createUserSchema } from '@shared/dto/Users';
import { ZodValidationPipe } from '../../pipes/zod-validation/ZodValidation.pipe';
import { UsersFacade } from './Users.facade';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private readonly usersFacade = new UsersFacade(this.usersService);

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
  async createUser(@Body() user: Prisma.UserCreateInput): Promise<UserModel> {
    return this.usersFacade.createUser(user);
  }
}
