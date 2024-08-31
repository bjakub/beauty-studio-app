import { Module } from '@nestjs/common';
import { UsersModule } from './users/Users.module';
import { AuthModule } from './auth/Auth.module';

@Module({
  imports: [UsersModule, AuthModule],
})
export class CoreModule {}
