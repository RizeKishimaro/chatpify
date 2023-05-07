"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./chat.gateway");
const chat_controller_1 = require("./chat.controller");
const chat_service_1 = require("./chat.service");
const LoginDetector_middleware_1 = require("../middlewares/LoginDetector.middleware");
const aes_hasher_help_1 = require("../security/aes-hasher.help");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schema/user.schema");
const jwtExtractor_help_1 = require("../security/jwtExtractor.help");
const jwt_helper_help_1 = require("../security/jwt-helper.help");
let ChatModule = class ChatModule {
    configure(consumer) {
        consumer.apply(LoginDetector_middleware_1.LoginDetectorMiddleware).forRoutes('chat');
    }
};
ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
        ],
        controllers: [chat_controller_1.ChatController],
        providers: [chat_service_1.ChatService, aes_hasher_help_1.CryptoService, chat_gateway_1.ChatGateway, jwtExtractor_help_1.JWTExtractor, jwt_helper_help_1.JWTHelper],
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map