import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
export declare class CspInserter implements NestMiddleware {
    use(req: any, res: Response, next: NextFunction): void;
}
