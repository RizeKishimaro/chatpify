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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const aes_hasher_help_1 = require("../security/aes-hasher.help");
let UserService = class UserService {
    constructor(userModel, jwtService, cryptoService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.cryptoService = cryptoService;
    }
    async getUser(id) {
        const dbUsers = await this.userModel.findById(id);
        return dbUsers;
    }
    getUsers() {
        const dbUser = this.userModel.find();
        return dbUser;
    }
    async createUser(createUserDto, req) {
        const password = createUserDto.password;
        const passwordConfirm = createUserDto.passwordConfirm;
        if (password !== passwordConfirm) {
            throw new common_1.HttpException('Your password and Confirm password are not same', 400);
        }
        const user = new this.userModel(createUserDto);
        const info = await user.save();
        info.role = 'user';
        const securityKey = this.cryptoService.encrypt(user.role);
        const id = this.cryptoService.encrypt(user.id);
        const name = this.cryptoService.encrypt(info.name);
        const payload = {
            ll2zBSe2ee2uE2: name,
            l2kk321_JW7hI0DpJ1: id,
            xvb32kk: securityKey,
            userid: user.id,
            islogged: true,
        };
        return {
            info: {
                access_token: this.cryptoService.encrypt(this.jwtService.sign(payload)),
                status: 'Success',
                message: 'Successfully login to your account!',
            },
        };
    }
    async loginUser(email, password, cryptoService) {
        const user = await this.userModel
            .findOne(email)
            .select(['password', 'role', 'name']);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.HttpException('The Email or password is Invalid or Incorrect', 400);
        }
        console.log(user.name);
        const securityKey = cryptoService.encrypt(user.role);
        const id = this.cryptoService.encrypt(user.id);
        const name = this.cryptoService.encrypt(user.name);
        const payload = {
            ll2zBSe2ee2uE2: name,
            l2kk321_JW7hI0DpJ1: id,
            xvb32kk: securityKey,
            userid: user.id,
            islogged: true,
        };
        return {
            info: {
                access_token: this.cryptoService.encrypt(this.jwtService.sign(payload)),
                status: 'Success',
                message: 'Successfully login to your account!',
            },
        };
    }
    async deleteUser(id) {
        await this.userModel.findByIdAndUpdate(id, { active: false }, { new: true });
        return { status: common_1.HttpStatus.ACCEPTED, message: 'Account deactivated' };
    }
    patchUser(id, userInfo) {
        return this.userModel.findByIdAndUpdate(id, userInfo);
    }
    updateUser(id) {
        return `${id} is password reset`;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService,
        aes_hasher_help_1.CryptoService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map