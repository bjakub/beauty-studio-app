import { Module } from '@nestjs/common';
import { UsersController } from './Users.controller';
import { UsersService } from './Users.service';
import { PrismaService } from '../../services/prisma/Prisma.service';
import { CryptoService } from '../../services/crypto/Crypto.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, CryptoService, ConfigService],
  exports: [UsersService],
})
export class UsersModule {}
