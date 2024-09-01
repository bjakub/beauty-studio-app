import { Module } from '@nestjs/common';
import { AuthModule } from './auth/Auth.module';
import { UsersModule } from './users/Users.module';

@Module({
  imports: [AuthModule, UsersModule],
})
export class CoreModule {}
