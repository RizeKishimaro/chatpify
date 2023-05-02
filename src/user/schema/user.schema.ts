import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { HttpException, HttpStatus, Res } from '@nestjs/common';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, select: false })
  passwordConfirm: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: 'user-pic.jpeg' })
  user_pic: string;

  @Prop({ select: false })
  Join_Date: Date;

  @Prop()
  nickname: string;

  @Prop()
  bio: string;

  @Prop({ select: false })
  passwordChangeAt: Date;

  @Prop({ select: false })
  passwordChangeToken: string;

  @Prop({ select: false })
  passwordChangeTokenExpires: string;

  @Prop({ default: true, select: false })
  active: boolean;

  @Prop({ enum: ['user', 'admin'], default: 'user', select: false })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: NextFunction) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    console.error(error);
    return next(new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR));
  }
});
