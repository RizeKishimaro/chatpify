"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const database_config_1 = require("./user/config/database.config");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./user/guards/roles/roles.guard");
const aes_hasher_help_1 = require("./security/aes-hasher.help");
const chat_module_1 = require("./chat/chat.module");
const jwt_helper_help_1 = require("./security/jwt-helper.help");
const throttler_1 = require("@nestjs/throttler");
const csp_middleware_1 = require("./middlewares/csp.middleware");
const passport_1 = require("@nestjs/passport");
const jwtExtractor_help_1 = require("./security/jwtExtractor.help");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(csp_middleware_1.CspInserter).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(database_config_1.default.DB_URI),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 10,
            }),
            passport_1.PassportModule,
            user_module_1.UserModule,
            chat_module_1.ChatModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            aes_hasher_help_1.CryptoService,
            jwt_helper_help_1.JWTHelper,
            csp_middleware_1.CspInserter,
            jwtExtractor_help_1.JWTExtractor,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map