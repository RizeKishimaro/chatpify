import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  googleLogin(req) {
    if (!req.user) {
      return 'User not authnicated!';
    }
    return {
      message: 'success login',
      user: req.user,
    };
  }
}
