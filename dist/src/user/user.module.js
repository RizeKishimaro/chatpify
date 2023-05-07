"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_controller_1 = require("./user.controller");
const user_schema_1 = require("./schema/user.schema");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("./config/jwt.config");
const handlers_filter_1 = require("./error/handlers/handlers.filter");
const aes_hasher_help_1 = require("../security/aes-hasher.help");
const jwtExtractor_help_1 = require("../security/jwtExtractor.help");
const jwt_helper_help_1 = require("../security/jwt-helper.help");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            jwt_1.JwtModule.register({
                global: true,
                secret: jwt_config_1.jwtKey.secret,
                signOptions: { expiresIn: '14d' },
            }),
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            create_user_dto_1.CreateUserDto,
            handlers_filter_1.MongoExceptionFilter,
            aes_hasher_help_1.CryptoService,
            jwtExtractor_help_1.JWTExtractor,
            jwt_helper_help_1.JWTHelper,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map