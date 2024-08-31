import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local/local.strategy';
import { AuthController } from './Auth.controller';
import { UsersModule } from '../users/Users.module';
import { CryptoService } from '../../services/crypto/Crypto.service';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, CryptoService],
})
export class AuthModule {}
