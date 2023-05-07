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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_decorator_1 = require("../../decorators/role.decorator");
const jwtExtractor_help_1 = require("../../../security/jwtExtractor.help");
let RolesGuard = class RolesGuard {
    constructor(reflactor, JWTExtractor) {
        this.reflactor = reflactor;
        this.JWTExtractor = JWTExtractor;
    }
    async canActivate(context) {
        const requiredRoles = this.reflactor.getAllAndOverride(role_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }
        try {
            const req = context.switchToHttp().getRequest();
            const payload = await this.JWTExtractor.extract(req);
            console.log(payload);
            const token = this.JWTExtractor.decrypt(payload.xvb32kk);
            return requiredRoles.some((role) => token.includes(role));
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Jwt token is invalid or expires!Please Login.',
            });
        }
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwtExtractor_help_1.JWTExtractor])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map