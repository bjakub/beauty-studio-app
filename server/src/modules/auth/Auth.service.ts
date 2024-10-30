import { CryptoService } from '../../shared/services/crypto/Crypto.service';
import { omit } from 'lodash';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeJwtPayload, EmployeeWithoutPassword } from './Auth.types';
import { RegisterEmployeeDTO } from '@shared/dto/Auth';
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

  async register(registeredEmployee: RegisterEmployeeDTO) {
    const employee = await this.employeeService.find({
      username: registeredEmployee.username,
    });

    if (employee) {
      throw new ConflictException(
        'Employee with specified username already exists!',
      );
    }

    try {
      const {
        username,
        experience,
        role: employeeRole,
        isActive,
        password,
      } = registeredEmployee;

      const hashedPassword = await this.cryptoService.hash(password);

      const { id: employeeId, role } = await this.employeeService.create({
        username,
        password: hashedPassword,
        role: employeeRole,
        experience,
        isActive,
      });

      const payload: EmployeeJwtPayload = {
        employeeId,
        role,
      };

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
