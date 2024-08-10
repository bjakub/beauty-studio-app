import { ConfigService } from '@nestjs/config';
import { genSalt, hash } from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

export class CryptoService {
  constructor(private configService: ConfigService) {}

  async hash(value: string): Promise<string> {
    try {
      const salt = await genSalt(this.configService.get<number>('CRYPTO_SALT'));
      return hash(value, salt);
    } catch (e) {
      throw new InternalServerErrorException('Error hashing value');
    }
  }
}
