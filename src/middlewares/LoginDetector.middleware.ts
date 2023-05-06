import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class LoginDetectorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    !req.headers.authorization ? next(new UnauthorizedException()) : next();
  }
}
