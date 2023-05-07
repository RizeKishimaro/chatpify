import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JWTExtractor } from 'src/security/jwtExtractor.help';
export declare class RolesGuard implements CanActivate {
    private reflactor;
    private JWTExtractor;
    constructor(reflactor: Reflector, JWTExtractor: JWTExtractor);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
