import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import Database from './user/config/database.config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './user/guards/roles/roles.guard';
import { CryptoService } from './user/security/aes-hasher.help';
@Module({
  imports: [UserModule, MongooseModule.forRoot(Database.DB_URI)],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    CryptoService,
  ],
})
export class AppModule {}
