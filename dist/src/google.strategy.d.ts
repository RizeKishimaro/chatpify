import { verifyCallback } from 'passport-google-oauth20';
declare const GoogleOAuth2_base: new (...args: any[]) => any;
export declare class GoogleOAuth2 extends GoogleOAuth2_base {
    constructor();
    validate(accesstoken: string, refreshToken: string, profile: any, authnicated: verifyCallback): Promise<any>;
}
export {};
