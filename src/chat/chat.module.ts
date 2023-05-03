import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatHelpers } from './helpers/chat-auth.helper';
import { JWTHelper } from 'src/user/security/jwt-helper.help';
import { ChatService } from './chat.service';

@Module({
  imports: [ChatGateway],
  controllers: [ChatController],
  providers: [ChatHelpers, JWTHelper, ChatService],
})
export class ChatModule {}
