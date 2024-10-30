import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { SKIP_AUTH_KEY } from '../../../../common/metadatas/SkipAuth.metadata';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipAuth) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      const message = info?.message ?? 'Unauthorized';

      this.logger.error(this.errorMessage(context, message));

      throw (
        err ||
        new UnauthorizedException({
          message,
        })
      );
    }

    return user;
  }

  private errorMessage(context: ExecutionContext, message: string): string {
    return `JwtGuard error: ${JSON.stringify({
      message,
      context: {
        host: context.switchToHttp().getRequest().hostname,
        url: context.switchToHttp().getRequest().url,
        method: context.switchToHttp().getRequest().method,
      },
    })}`;
  }
}
