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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_service_1 = require("./user.service");
const signup_user_dto_1 = require("./dto/signup-user.dto");
const jwt_guard_1 = require("./guards/jwt/jwt.guard");
const handlers_filter_1 = require("./error/handlers/handlers.filter");
const role_decorator_1 = require("./decorators/role.decorator");
const database_enum_1 = require("./config/database.enum");
const aes_hasher_help_1 = require("../security/aes-hasher.help");
let UserController = class UserController {
    constructor(userService, hashAesAlgo) {
        this.userService = userService;
        this.hashAesAlgo = hashAesAlgo;
    }
    getUser(id) {
        const data = this.userService.getUser(id);
        return data;
    }
    getAllUsers(req) {
        const data = this.userService.getUsers();
        return data;
    }
    async signUpUser(userInfo, req) {
        const signInInfo = await this.userService.createUser(userInfo, req);
        console.log(signInInfo);
        return signInInfo;
    }
    renderLogin(req, res) {
        return res.render('login');
    }
    async loginUser(userInfo) {
        const email = { email: userInfo.email };
        const result = await this.userService.loginUser(email, userInfo.password, new aes_hasher_help_1.CryptoService());
        return result;
    }
    patchUser(id, userInfo) {
        return this.userService.patchUser(id, userInfo);
    }
    deleteUser(id) {
        return this.userService.deleteUser(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('profiles/:id'),
    (0, common_1.UseFilters)(handlers_filter_1.HandleValidateError, handlers_filter_1.MongoExceptionFilter),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('profiles'),
    (0, role_decorator_1.Roles)(database_enum_1.PremiumRoles.premium),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.UseFilters)(handlers_filter_1.HandleValidateError, handlers_filter_1.MongoExceptionFilter),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUpUser", null);
__decorate([
    (0, common_1.Get)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "renderLogin", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_user_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Patch)('profile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "patchUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)('/:id/deactivateAccount'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        aes_hasher_help_1.CryptoService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map