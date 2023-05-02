import { Injectable } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

Injectable();
export class LoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
