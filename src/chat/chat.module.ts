import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';

@Module({
    imports: [ChatGateway],
    controllers: [ChatController]
})
export class ChatModule {}
