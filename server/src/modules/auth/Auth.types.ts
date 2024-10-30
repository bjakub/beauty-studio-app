import { Employee } from '.prisma/client';
import { EmployeeRole } from '@shared/dto/Employee';

export type EmployeeJwtPayload = {
  employeeId: number;
  role: EmployeeRole;
};

export type EmployeeWithoutPassword = Omit<Employee, 'password'>;
