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
var ChatGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGuard = void 0;
const common_1 = require("@nestjs/common");
const jwtExtractor_help_1 = require("../../security/jwtExtractor.help");
let ChatGuard = ChatGuard_1 = class ChatGuard {
    constructor(JWTExtractor) {
        this.JWTExtractor = JWTExtractor;
    }
    async canActivate(context) {
        const logger = new common_1.Logger(ChatGuard_1.name);
        const client = context.switchToWs().getClient();
        const authKey = client.handshake.headers.auth;
        if (!authKey) {
            return false;
        }
        const token = this.JWTExtractor.decrypt(authKey);
        const result = await this.JWTExtractor.checkJwt(token);
        let authnicated;
        result.islogged ? (authnicated = true) : (authnicated = false);
        return authnicated;
    }
};
ChatGuard = ChatGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwtExtractor_help_1.JWTExtractor])
], ChatGuard);
exports.ChatGuard = ChatGuard;
//# sourceMappingURL=chat.guard.js.map