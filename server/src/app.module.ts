import { Module } from '@nestjs/common';
import { SharedModule } from './shared/Shared.module';
import { AuthModule } from './modules/auth';

@Module({
  imports: [SharedModule, AuthModule],
})
export class AppModule {}
