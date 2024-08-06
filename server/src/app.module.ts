import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './configuration/validation';
import { UsersModule } from '../users/Users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
