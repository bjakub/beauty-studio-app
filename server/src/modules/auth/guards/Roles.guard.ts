import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@shared/dto/Users';
import { ROLES_KEY } from '../../../decorators/Roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger();

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      this.logger.log('Checking role omitted!');
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      this.logger.error('Cannot find user during checking role!');
      return false;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}