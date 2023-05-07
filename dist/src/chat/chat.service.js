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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schema/user.schema");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const aes_hasher_help_1 = require("../security/aes-hasher.help");
let ChatService = class ChatService {
    constructor(userModel, jwtService, cryptoService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.cryptoService = cryptoService;
    }
    async getAllUser(limit, skip) {
        console.log(limit ? 10 * limit : 10);
        const user = await this.userModel
            .find()
            .limit(limit ? 10 * limit : 10)
            .skip(skip ? skip : 0);
        return user;
    }
    async find(id) {
        console.log(id);
        const user = await this.userModel.findById(id);
        return user;
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        aes_hasher_help_1.CryptoService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map