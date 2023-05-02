import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtKey } from './config/jwt.config';
import { MongoExceptionFilter } from './error/handlers/handlers.filter';
import { CryptoService } from './security/aes-hasher.help';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: jwtKey.secret,
      signOptions: { expiresIn: '14d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, CreateUserDto, MongoExceptionFilter, CryptoService],
})
export class UserModule {}
