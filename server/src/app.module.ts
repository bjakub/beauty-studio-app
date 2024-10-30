import { Module } from '@nestjs/common';
import { SharedModule } from './shared/Shared.module';
import { AuthModule } from './modules/auth';
import { EmployeeModule } from './modules/employee/Employee.module';

@Module({
  imports: [SharedModule, AuthModule, EmployeeModule],
})
export class AppModule {}
