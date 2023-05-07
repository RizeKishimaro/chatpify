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
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
const chat_guard_1 = require("./guards/chat.guard");
const aes_hasher_help_1 = require("../security/aes-hasher.help");
const jwtExtractor_help_1 = require("../security/jwtExtractor.help");
let ChatGateway = class ChatGateway {
    constructor(chatService, cryptoService, jwtExtractor) {
        this.chatService = chatService;
        this.cryptoService = cryptoService;
        this.jwtExtractor = jwtExtractor;
    }
    afterInit(server) {
        console.log(`server started `);
    }
    async handleConnection(req, ...args) {
        const userToken = req.handshake.headers.auth;
        const userParamToken = req;
        if (!userToken) {
            this.ws.emit('login_failed', { message: 'Please login!' });
            return;
        }
        const token = this.cryptoService.decrypt(userToken);
        const payload = await this.jwtExtractor.checkJwt(token);
        const username = this.jwtExtractor.decrypt(payload.ll2zBSe2ee2uE2);
        const userId = payload.userid;
        req.user = { username, userId };
        this.ws.emit('clientConnect', { username: username, id: req.id });
    }
    handleDisconnect(client) {
        const username = client.user.username;
        const id = client.id;
        this.ws.emit('clientDisconnect', { username, id });
    }
    sendMessage(client, { message, to }) {
        console.log(client.rooms);
        const name = client.user.username;
        client
            .to(to)
            .to(client.id)
            .emit('newPrivateMessage', { sender: name, message: message });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "ws", void 0);
__decorate([
    (0, common_1.UseGuards)(chat_guard_1.ChatGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, common_1.UseGuards)(chat_guard_1.ChatGuard),
    (0, websockets_1.SubscribeMessage)('messageToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "sendMessage", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(9900, {
        cors: {
            origin: 'http://127.0.0.1:3000',
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        aes_hasher_help_1.CryptoService,
        jwtExtractor_help_1.JWTExtractor])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map