import { EmployeeExperience, EmployeeRole } from "../dto";
import { UserDetails } from "./UserDetails";

interface Employee {
  id: number;
  username: string;
  experience: EmployeeExperience;
  isActive: boolean;
  role: EmployeeRole;
  userDetails?: UserDetails;
}

export type GetAllEmployeesAPI = Employee[];

export type CreateEmployeeAPI = Employee;
