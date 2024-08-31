import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './configuration/validation';
import { CryptoService } from './services/crypto/Crypto.service';
import { CoreModule } from './modules/Core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
    CoreModule,
  ],
  providers: [
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
