import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTHelper {
  extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
