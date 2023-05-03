import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/user/guards/jwt/jwt.guard';

@Controller('chat')
export class ChatController {
  @Get()
  @UseGuards(JwtGuard)
  chatInit(@Res() res: any) {
    console.log(__dirname);
    return res.render('chat');
  }
}
