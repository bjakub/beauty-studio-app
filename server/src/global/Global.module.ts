import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CryptoService } from '../services/crypto/Crypto.service';
import { validationSchema } from '../configuration/validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
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
  exports: [ConfigService, CryptoService],
})
export class GlobalModule {}
