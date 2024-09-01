import { ConfigService } from '@nestjs/config';
import { genSalt, hash, compare } from 'bcrypt';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CryptoService {
  constructor(private configService: ConfigService) {}

  async hash(value: string): Promise<string> {
    try {
      const salt = await genSalt(this.configService.get<number>('CRYPTO_SALT'));
      return hash(value, salt);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Error hashing value');
    }
  }

  async compare(value: string, comparedValue: string): Promise<boolean> {
    try {
      return await compare(value, comparedValue);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Error during comparing');
    }
  }
}
