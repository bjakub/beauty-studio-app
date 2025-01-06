import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { EmployeeFacade } from './Employee.facade';
import { ZodValidationPipe } from '../../common/pipes/zod-validation/ZodValidation.pipe';
import {
  ChangeEmployeeStatusDTO,
  ChangeEmployeeStatusSchema,
  CreateEmployeeDTO,
  CreateEmployeeSchema,
} from '@repo/types/dto';
import { EmployeeService } from '../../database/repositories/employee/Employee.service';
import { CryptoService } from '../../shared/services/crypto/Crypto.service';
import { Roles } from '../../common/metadatas/Roles.metadata';
import { GetAllEmployeesAPI, CreateEmployeeAPI } from '@repo/types/api';

@Roles('OWNER')
@Controller('employees')
export class EmployeeController {
  private employeeFacade: EmployeeFacade;
  constructor(
    private employeeService: EmployeeService,
    private cryptoService: CryptoService,
  ) {
    this.employeeFacade = new EmployeeFacade(employeeService, cryptoService);
  }

  @Get()
  async getAllEmployees(): Promise<GetAllEmployeesAPI> {
    return this.employeeFacade.getAll();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateEmployeeSchema))
  async createEmployee(
    @Body() employee: CreateEmployeeDTO,
  ): Promise<CreateEmployeeAPI> {
    return this.employeeFacade.create(employee);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('change-status')
  @UsePipes(new ZodValidationPipe(ChangeEmployeeStatusSchema))
  async changeEmployeeStatus(
    @Body() statusDetails: ChangeEmployeeStatusDTO,
  ): Promise<void> {
    return this.employeeFacade.changeStatus(statusDetails);
  }
}
