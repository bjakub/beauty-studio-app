import { CryptoService } from '../../shared/services/crypto/Crypto.service';
import { omit } from 'lodash';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeJwtPayload, EmployeeWithoutPassword } from './Auth.types';
import { EmployeeService } from '../../database/repositories/employee/Employee.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private employeeService: EmployeeService,
    private cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async validateEmployee(
    username: string,
    password: string,
  ): Promise<EmployeeWithoutPassword | null> {
    const employee = await this.employeeService.find({
      username,
    });

    if (
      employee &&
      (await this.cryptoService.compare(password, employee.password))
    ) {
      return omit(employee, 'password');
    }

    return null;
  }

  async login(employee: any) {
    const payload: EmployeeJwtPayload = {
      employeeId: employee.id,
      role: employee.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token);
      return { isValid: true };
    } catch (error) {
      this.logger.warn('Token expired or invalid');
      return { isValid: false };
    }
  }
}
