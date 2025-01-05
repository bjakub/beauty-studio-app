import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { EmployeeJwtPayload } from '../../modules/auth';

export const Employee = createParamDecorator<EmployeeJwtPayload | undefined>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.employee;
  },
);
