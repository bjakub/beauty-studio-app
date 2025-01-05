import { Module } from '@nestjs/common';
import { EmployeeController } from './Employee.controller';
import { DatabaseModule } from '../../database/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
