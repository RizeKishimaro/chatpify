import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { AuthGuard } from '@nestjs/passport';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @UseGuards(AuthGuard('google'))
  googleAuthController(@Req() req: any): void {}

  @Get('/auth/Chatpify/Oauth/callback')
  @UseGuards(AuthGuard('google'))
  AuthGoogleUserRoute(@Req() req: any) {
    this.appService.googleLogin(req);
    return req.user;
  }
  @Get('profile')
  aboutMe(@Req() req: any) {
    console.log(req.user);
  }
}
