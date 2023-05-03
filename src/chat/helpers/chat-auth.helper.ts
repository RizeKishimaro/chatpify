import { Injectable } from '@nestjs/common';
import { JWTHelper } from 'src/user/security/jwt-helper.help';

@Injectable()
export class ChatHelpers {
  constructor(private jwtHelper: JWTHelper) {}

  isValidId(request: any) {
    const jwt = this.jwtHelper.extractTokenFromHeader(request);
  }
}
