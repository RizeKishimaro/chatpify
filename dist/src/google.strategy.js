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
exports.GoogleOAuth2 = void 0;
const common_1 = require("@nestjs/common");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = require("@nestjs/passport");
let GoogleOAuth2 = class GoogleOAuth2 extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy) {
    constructor() {
        super({
            clientID: '780824561578-14987el03nl7vec7oounhb585d19vgr7.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://127.0.0.1:3000/auth/Chatpify/Oauth/callback',
            scope: ['email', 'profile'],
        });
    }
    async validate(accesstoken, refreshToken, profile, authnicated) {
        const { name, photos, emails } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accesstoken,
        };
        authnicated(null, user);
    }
};
GoogleOAuth2 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleOAuth2);
exports.GoogleOAuth2 = GoogleOAuth2;
//# sourceMappingURL=google.strategy.js.map