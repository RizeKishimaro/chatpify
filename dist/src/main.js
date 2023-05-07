"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', '..', 'views'));
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['chatpify-user', 'content-type'],
        credentials: true,
    });
    app.setViewEngine('hbs');
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map