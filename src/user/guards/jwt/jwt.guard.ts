import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtKey } from 'src/user/config/jwt.config';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException({
        error: 'You are not authorize',
      });
    }
    try {
      const payload = await this.jwtService.verify(token, {
        secret: jwtKey.secret,
      });
      request['user'] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Jwt token is invalid or expires!Please Login.',
      });
    }
  }
  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
