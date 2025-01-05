import { Employee } from '.prisma/client';
import { EmployeeRole } from '@repo/types/dto';

export type EmployeeJwtPayload = {
  employeeId: number;
  role: EmployeeRole;
};

export type EmployeeWithoutPassword = Omit<Employee, 'password'>;
