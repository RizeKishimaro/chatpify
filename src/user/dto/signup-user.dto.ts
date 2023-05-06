import { Injectable } from '@nestjs/common';
import { IsEmail, IsNotEmpty } from 'class-validator';

Injectable();
export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
