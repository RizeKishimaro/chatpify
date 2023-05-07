import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JWTExtractor } from 'src/security/jwtExtractor.help';
export declare class JwtGuard implements CanActivate {
    private JWTExtractor;
    constructor(JWTExtractor: JWTExtractor);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
