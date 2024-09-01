import { Module } from '@nestjs/common';
import { UsersController } from './Users.controller';
import { UsersService } from './Users.service';
import { PrismaService } from '../../services/prisma/Prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
