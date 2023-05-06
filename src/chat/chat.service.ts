import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/security/aes-hasher.help';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}
  async getAllUser(limit?: number, skip?: number) {
    console.log(limit ? 10 * limit : 10);
    const user = await this.userModel
      .find()
      .limit(limit ? 10 * limit : 10)
      .skip(skip ? skip : 0);
    return user;
  }
  async find(id) {
    console.log(id);
    const user = await this.userModel.findById(id);
    return user;
  }
}
