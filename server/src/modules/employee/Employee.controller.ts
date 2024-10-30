import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { EmployeeFacade } from './Employee.facade';
import { ZodValidationPipe } from '../../common/pipes/zod-validation/ZodValidation.pipe';
import { CreateEmployeeDTO, CreateEmployeeSchema } from '@shared/dto/Employee';
import { EmployeeService } from '../../database/repositories/employee/Employee.service';
import { CryptoService } from '../../shared/services/crypto/Crypto.service';
import { Roles } from '../../common/metadatas/Roles.metadata';

@Roles('OWNER')
@Controller('employee')
export class EmployeeController {
  private employeeFacade: EmployeeFacade;
  constructor(
    private employeeService: EmployeeService,
    private cryptoService: CryptoService,
  ) {
    this.employeeFacade = new EmployeeFacade(employeeService, cryptoService);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateEmployeeSchema))
  async createEmployee(@Body() employee: CreateEmployeeDTO) {
    return this.employeeFacade.createEmployee(employee);
  }
}
