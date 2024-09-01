import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local/local.strategy';
import { AuthController } from './Auth.controller';
import { UsersModule } from '../users/Users.module';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
