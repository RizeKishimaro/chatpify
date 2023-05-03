import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/user/security/aes-hasher.help';
import { PremiumRoles } from 'src/user/config/database.enum';
import { ROLES_KEY } from 'src/user/decorators/role.decorator';
import { jwtKey } from 'src/user/config/jwt.config';
import { JWTHelper } from 'src/user/security/jwt-helper.help';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflactor: Reflector,
    private cryptoService: CryptoService,
    private jwtService: JwtService,
    private jwtHelper: JWTHelper
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
      const extractor = this.jwtHelper.extractTokenFromHeader(req)
      const payload = await this.jwtService.verify(extractor, {
        secret: jwtKey.secret,
      });
      const token = this.cryptoService.decrypt(payload.xvb32kk);
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
