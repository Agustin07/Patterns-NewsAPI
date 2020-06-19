import {
  IsString,
  Length,
  IsNotEmpty,
  IsDefined,
  IsEmail,
} from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(4, 50)
  password: string;
}

export class LoginUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(4, 50)
  password: string;
}

export class UserDto {
  id: number;
  email: string;
  username: string;

  @Exclude()
  password: string;

  isActive: boolean;
  entryDate: Date;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
