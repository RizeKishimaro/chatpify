import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import Database from './user/config/database.config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './user/guards/roles/roles.guard';
import { CryptoService } from './user/security/aes-hasher.help';
import { ChatModule } from './chat/chat.module';
import { JWTHelper } from './user/security/jwt-helper.help';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    MongooseModule.forRoot(Database.DB_URI),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UserModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    CryptoService,
    JWTHelper,
  ],
})
export class AppModule {}
