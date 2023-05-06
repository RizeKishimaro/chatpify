import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/user/guards/jwt/jwt.guard';
import { ChatService } from './chat.service';
import { ChatGuard } from './guards/chat.guard';
import {
  HandleValidateError,
  MongoExceptionFilter,
} from 'src/user/error/handlers/handlers.filter';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Get()
  @UseGuards(JwtGuard)
  @UseFilters(MongoExceptionFilter, HandleValidateError)
  async chatInit(@Res() res: any, @Req() req: any): Promise<any> {
    const data = await this.chatService.getAllUser();
    return res.send(data);
  }
}
