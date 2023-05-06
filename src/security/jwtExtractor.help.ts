import { JwtService } from '@nestjs/jwt';
import { CryptoService } from './aes-hasher.help';
import { JWTHelper } from './jwt-helper.help';
import { jwtKey } from 'src/user/config/jwt.config';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JWTExtractor {
  constructor(
    private jwtHelper: JWTHelper,
    private cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async extract(req) {
    try {
      const JwtToken = req.headers.authorization;
      const extractor = this.jwtHelper.extractTokenFromHeader(JwtToken);
      const jwttoken = this.cryptoService.decrypt(extractor);
      return await this.checkJwt(jwttoken);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Jwt token is invalid or expires!Please Login.',
      });
    }
  }
  async checkJwt(extractedToken: string) {
    const payload = await this.jwtService.verify(extractedToken, {
      secret: jwtKey.secret,
    });
    return payload;
  }
  decrypt(text) {
    return this.cryptoService.decrypt(text);
  }
}
