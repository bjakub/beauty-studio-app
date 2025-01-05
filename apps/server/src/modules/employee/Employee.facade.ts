import { EmployeeService } from '../../database/repositories/employee/Employee.service';
import { ChangeEmployeeStatusDTO, CreateEmployeeDTO } from '@repo/types/dto';
import { CryptoService } from '../../shared/services/crypto/Crypto.service';
import { ConflictException, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class EmployeeFacade {
  private readonly logger = new Logger(EmployeeFacade.name);

  private select: Prisma.EmployeeSelect = {
    id: true,
    username: true,
    experience: true,
    isActive: true,
    role: true,
    userDetails: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    },
  };

  constructor(
    private employeeService: EmployeeService,
    private cryptoService: CryptoService,
  ) {}

  async getAll() {
    return await this.employeeService.findAll({ select: this.select });
  }

  async create(newEmployee: CreateEmployeeDTO) {
    const employee = await this.employeeService.find({
      username: newEmployee.username,
    });

    if (employee) {
      throw new ConflictException(
        'Employee with specified username already exists!',
      );
    }

    const { username, experience, isActive, password, userDetails } =
      newEmployee;
    const hashedPassword = await this.cryptoService.hash(password);

    return await this.employeeService.create(
      {
        username,
        password: hashedPassword,
        role: 'WORKER',
        experience,
        isActive,
        ...(userDetails ? { userDetails: { create: userDetails } } : {}),
      },
      this.select,
    );
  }

  async changeStatus(details: ChangeEmployeeStatusDTO) {
    const { id, isActive } = details;

    const employee = await this.employeeService.find({
      id,
    });

    if (!employee) {
      throw new ConflictException('Employee with specified id does not exist!');
    }

    if (employee.isActive === isActive) {
      throw new ConflictException(
        'Employee is already in the specified status!',
      );
    }

    await this.employeeService.update({
      where: { id: details.id },
      data: { isActive },
      select: this.select,
    });
  }
}
