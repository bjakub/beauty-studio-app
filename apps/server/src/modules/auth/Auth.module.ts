import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local/local.strategy';
import { AuthController } from './Auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './strategy/jwt/jwt.guard';
import { RolesGuard } from './guards/Roles.guard';
import { DatabaseModule } from '../../database/Database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ property: 'employee' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AuthModule {}
