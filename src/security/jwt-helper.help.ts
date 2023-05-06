import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTHelper {
  extractTokenFromHeader(JWTtoken): string | undefined {
    const [type, token] = JWTtoken?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
