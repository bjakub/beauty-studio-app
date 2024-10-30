import { EmployeeService } from '../../database/repositories/employee/Employee.service';
import { CreateEmployeeDTO } from '@shared/dto/Employee';
import { CryptoService } from '../../shared/services/crypto/Crypto.service';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export class EmployeeFacade {
  private readonly logger = new Logger(EmployeeFacade.name);

  constructor(
    private employeeService: EmployeeService,
    private cryptoService: CryptoService,
  ) {}

  async createEmployee(newEmployee: CreateEmployeeDTO) {
    const employee = await this.employeeService.find({
      username: newEmployee.username,
    });

    if (employee) {
      throw new ConflictException(
        'Employee with specified username already exists!',
      );
    }

    try {
      const { username, experience, isActive, password } = newEmployee;

      const hashedPassword = await this.cryptoService.hash(password);

      return await this.employeeService.create({
        username,
        password: hashedPassword,
        role: 'WORKER',
        experience,
        isActive,
      });
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
