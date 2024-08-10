import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { CryptoService } from '../crypto/Crypto.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private cryptoService: CryptoService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();

    await this.$use(async (params, next) => {
      switch (params.model) {
        case 'User':
          if (
            ['create', 'update'].includes(params.action) &&
            params.args.data.password
          ) {
            params.args.data.password = await this.cryptoService.hash(
              params.args.data.password,
            );
          }
          break;
      }

      return next(params);
    });
  }
}
