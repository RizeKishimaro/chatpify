import { Injectable } from '@nestjs/common';
import { verifyCallback, Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GoogleOAuth2 extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID:
        '780824561578-14987el03nl7vec7oounhb585d19vgr7.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://127.0.0.1:3000/auth/Chatpify/Oauth/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accesstoken: string,
    refreshToken: string,
    profile: any,
    authnicated: verifyCallback,
  ): Promise<any> {
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
}
