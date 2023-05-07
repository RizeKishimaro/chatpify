"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const jwt_config_1 = require("../user/config/jwt.config");
let CryptoService = class CryptoService {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.ivLength = 16;
        this.key = jwt_config_1.jwtKey.aes_secret;
    }
    encrypt(text) {
        const iv = (0, crypto_1.randomBytes)(this.ivLength);
        const cipher = (0, crypto_1.createCipheriv)(this.algorithm, this.key, iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }
    decrypt(text) {
        const [ivString, encryptedString] = text.split(':');
        const iv = Buffer.from(ivString, 'hex');
        const encrypted = Buffer.from(encryptedString, 'hex');
        const decipher = (0, crypto_1.createDecipheriv)(this.algorithm, this.key, iv);
        let decrypted = decipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
};
CryptoService = __decorate([
    (0, common_1.Injectable)()
], CryptoService);
exports.CryptoService = CryptoService;
//# sourceMappingURL=aes-hasher.help.js.map