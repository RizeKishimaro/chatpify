import { JwtService } from '@nestjs/jwt';
import { CryptoService } from './aes-hasher.help';
import { JWTHelper } from './jwt-helper.help';
export declare class JWTExtractor {
    private jwtHelper;
    private cryptoService;
    private jwtService;
    constructor(jwtHelper: JWTHelper, cryptoService: CryptoService, jwtService: JwtService);
    extract(req: any): Promise<any>;
    checkJwt(extractedToken: string): Promise<any>;
    decrypt(text: any): string;
}
