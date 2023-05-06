import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CryptoService } from '../security/aes-hasher.help';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}
  async getUser(id: string): Promise<User[] | User> {
    const dbUsers = await this.userModel.findById(id);
    return dbUsers;
  }
  getUsers(): Promise<User[]> {
    const dbUser = this.userModel.find();
    return dbUser;
  }
  async createUser(createUserDto: CreateUserDto, req: any): Promise<object> {
    const password = createUserDto.password;
    const passwordConfirm = createUserDto.passwordConfirm;
    if (password !== passwordConfirm) {
      throw new HttpException(
        'Your password and Confirm password are not same',
        400,
      );
    }
    const user = new this.userModel(createUserDto);
    const info = await user.save();
    info.role = 'user';
    const securityKey = this.cryptoService.encrypt(user.role);
    const id = this.cryptoService.encrypt(user.id);
    const name = this.cryptoService.encrypt(info.name);
    const payload = {
      ll2zBSe2ee2uE2: name,
      l2kk321_JW7hI0DpJ1: id,
      xvb32kk: securityKey,
      userid: user.id,
      islogged: true,
    };
    return {
      info: {
        access_token: this.cryptoService.encrypt(this.jwtService.sign(payload)),
        status: 'Success',
        message: 'Successfully login to your account!',
      },
    };
  }
  async loginUser(email: any, password: any, cryptoService: CryptoService) {
    const user = await this.userModel
      .findOne(email)
      .select(['password', 'role', 'name']);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException(
        'The Email or password is Invalid or Incorrect',
        400,
      );
    }
    console.log(user.name);
    const securityKey = cryptoService.encrypt(user.role);
    const id = this.cryptoService.encrypt(user.id);
    const name = this.cryptoService.encrypt(user.name);
    const payload = {
      ll2zBSe2ee2uE2: name,
      l2kk321_JW7hI0DpJ1: id,
      xvb32kk: securityKey,
      userid: user.id,
      islogged: true,
    };
    return {
      info: {
        access_token: this.cryptoService.encrypt(this.jwtService.sign(payload)),
        status: 'Success',
        message: 'Successfully login to your account!',
      },
    };
  }
  async deleteUser(id: string): Promise<object> {
    await this.userModel.findByIdAndUpdate(
      id,
      { active: false },
      { new: true },
    );
    return { status: HttpStatus.ACCEPTED, message: 'Account deactivated' };
  }

  patchUser(id: number, userInfo: object) {
    return this.userModel.findByIdAndUpdate(id, userInfo);
  }

  updateUser(id: number) {
    return `${id} is password reset`;
  }
}
