import { Employee } from '.prisma/client';

declare global {
  namespace Express {
    interface Request {
      employee?: Omit<Employee, 'password'>;
    }
  }
}
