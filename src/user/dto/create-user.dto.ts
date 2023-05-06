import { Injectable } from '@nestjs/common';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

@Injectable()
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly passwordConfirm: string;
  readonly passwordChangeAt: Date;

  readonly user_pic: string;

  readonly Join_Date: string;

  readonly nickname: string;

  readonly bio: string;

  readonly passwordChangeToken: string;

  readonly passwordChangeTokenExpires: Date;

  readonly active: boolean;
}
