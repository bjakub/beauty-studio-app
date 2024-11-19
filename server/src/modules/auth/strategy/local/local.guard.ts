import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalAuthGuard.name);

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    employee: any,
    info: any,
    _context: ExecutionContext,
  ) {
    if (err || !employee) {
      this.logger.error(err || info);
      throw err || new UnauthorizedException();
    }

    return employee;
  }
}
