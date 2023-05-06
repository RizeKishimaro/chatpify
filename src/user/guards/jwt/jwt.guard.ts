import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTExtractor } from 'src/security/jwtExtractor.help';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private JWTExtractor: JWTExtractor) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.JWTExtractor.extract(request);
    console.log(token);
    if (!token) {
      throw new UnauthorizedException({
        error: 'You are not authorize',
      });
    }
    return true;
  }
  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
