import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../../common/metadatas/Roles.metadata';
import { EmployeeRole } from '@shared/dto/Employee';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<EmployeeRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      this.logger.warn('Checking role omitted!');
      return true;
    }

    const { employee } = context.switchToHttp().getRequest();

    if (!employee) {
      this.logger.error('Cannot find employee during checking role!');
      return false;
    }

    return requiredRoles.some((role) => employee.role === role);
  }
}
