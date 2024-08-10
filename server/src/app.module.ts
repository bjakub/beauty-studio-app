import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './configuration/validation';
import { CryptoService } from './services/crypto/Crypto.service';
import { PrismaService } from './services/prisma/Prisma.service';
import { UsersController } from './modules/users/Users.controller';
import { AuthController } from './modules/auth/Auth.controller';
import { UsersService } from './services/users/Users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    UsersService,
    PrismaService,
    ConfigService,
    {
      provide: CryptoService,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new CryptoService(configService),
    },
  ],
})
export class AppModule {}
