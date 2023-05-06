import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { LoginDetectorMiddleware } from 'src/middlewares/LoginDetector.middleware';
import { CryptoService } from 'src/security/aes-hasher.help';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { JWTExtractor } from 'src/security/jwtExtractor.help';
import { JWTHelper } from 'src/security/jwt-helper.help';
import { ChatGuard } from './guards/chat.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatService, CryptoService, ChatGateway, JWTExtractor, JWTHelper],
})
export class ChatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginDetectorMiddleware).forRoutes('chat');
  }
}
