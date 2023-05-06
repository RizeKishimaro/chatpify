import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/security/aes-hasher.help';
import { PremiumRoles } from 'src/user/config/database.enum';
import { ROLES_KEY } from 'src/user/decorators/role.decorator';
import { jwtKey } from 'src/user/config/jwt.config';
import { JWTHelper } from 'src/security/jwt-helper.help';
import { JWTExtractor } from 'src/security/jwtExtractor.help';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflactor: Reflector,
    private JWTExtractor: JWTExtractor,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflactor.getAllAndOverride<PremiumRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    try {
      const req = context.switchToHttp().getRequest();
      const payload = await this.JWTExtractor.extract(req);
      console.log(payload);
      const token = this.JWTExtractor.decrypt(payload.xvb32kk);
      return requiredRoles.some((role) => token.includes(role));
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Jwt token is invalid or expires!Please Login.',
      });
    }
  }
}
