import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/Prisma.service';
import { EmployeeService } from './repositories/employee/Employee.service';

@Module({
  providers: [PrismaService, EmployeeService],
  exports: [EmployeeService],
})
export class DatabaseModule {}
