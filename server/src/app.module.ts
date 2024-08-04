import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentVariablesConfig } from './config/environment-variables/EnvironmentVariables.config';

@Module({
  imports: [EnvironmentVariablesConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
