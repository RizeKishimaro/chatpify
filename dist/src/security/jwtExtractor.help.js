"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTExtractor = void 0;
const jwt_1 = require("@nestjs/jwt");
const aes_hasher_help_1 = require("./aes-hasher.help");
const jwt_helper_help_1 = require("./jwt-helper.help");
const jwt_config_1 = require("../user/config/jwt.config");
const common_1 = require("@nestjs/common");
let JWTExtractor = class JWTExtractor {
    constructor(jwtHelper, cryptoService, jwtService) {
        this.jwtHelper = jwtHelper;
        this.cryptoService = cryptoService;
        this.jwtService = jwtService;
    }
    async extract(req) {
        try {
            const JwtToken = req.headers.authorization;
            const extractor = this.jwtHelper.extractTokenFromHeader(JwtToken);
            const jwttoken = this.cryptoService.decrypt(extractor);
            return await this.checkJwt(jwttoken);
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException({
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: 'Jwt token is invalid or expires!Please Login.',
            });
        }
    }
    async checkJwt(extractedToken) {
        const payload = await this.jwtService.verify(extractedToken, {
            secret: jwt_config_1.jwtKey.secret,
        });
        return payload;
    }
    decrypt(text) {
        return this.cryptoService.decrypt(text);
    }
};
JWTExtractor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_helper_help_1.JWTHelper,
        aes_hasher_help_1.CryptoService,
        jwt_1.JwtService])
], JWTExtractor);
exports.JWTExtractor = JWTExtractor;
//# sourceMappingURL=jwtExtractor.help.js.map