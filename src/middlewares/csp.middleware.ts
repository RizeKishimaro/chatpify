import { Injectable, NestMiddleware, Req } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

Injectable();
export class CspInserter implements NestMiddleware {
  use(@Req() req, res: Response, next: NextFunction) {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self' http://localhost:3000",
    );
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  }
}
