import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/user/guards/jwt/jwt.guard';
import { ChatHelpers } from './helpers/chat-auth.helper';

@Controller('chat')
export class ChatController {
  constructor(private jwtIdentifier: ChatHelpers) {}
  @Get()
  @UseGuards(JwtGuard)
  chatInit(@Res() res: any, @Req() req: any) {
    const authToken = this.jwtIdentifier.isValidId(req);
    return res.render('chat');
  }
}
