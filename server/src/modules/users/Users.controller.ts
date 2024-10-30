import {
  // Body,
  Controller,
  // Get,
  // Param,
  // ParseIntPipe,
  // Post,
  // UsePipes,
} from '@nestjs/common';
// import { ZodValidationPipe } from '../../common/pipes/zod-validation/ZodValidation.pipe';
// import { UsersFacade } from './Users.facade';
import { CryptoService } from '../../shared/services/crypto/Crypto.service';
import { Roles } from '../../common/metadatas/Roles.metadata';

@Roles('OWNER')
@Controller('users')
export class UsersController {
  constructor(private cryptoService: CryptoService) {}

  // private readonly usersFacade = new UsersFacade(
  //   // this.usersService,
  //   this.cryptoService,
  // );

  // @Get()
  // async getAllUsers(): Promise<[]> {
  //   return this.usersFacade.getAllUsers();
  // }
  //
  // @Get('/:id')
  // async getUserById(
  //   @Param('id', ParseIntPipe) id: number,
  // ): Promise<UserModel | null> {
  //   return this.usersFacade.getUserById(id);
  // }
  //
  // @Post()
  // @UsePipes(new ZodValidationPipe(CreateUserSchema))
  // async createUser(@Body() user: Prisma.UserCreateInput): Promise<UserModel> {
  //   return this.usersFacade.createUser(user);
  // }
}
