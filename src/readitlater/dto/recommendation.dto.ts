import { IsString, IsNotEmpty, IsNumberString } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';
import { Exclude } from 'class-transformer';

export class CreateRecommendationDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsNumberString()
  userid: number;
}

export class RecommendationDto {
  id: number;
  url: string;
  entryDate: Date;

  @Exclude()
  user: UserDto;
  @Exclude()
  referral: UserDto;

  constructor(partial: Partial<RecommendationDto>) {
    Object.assign(this, partial);
  }
}

export class ReferenceDto {
  id: number;
  url: string;
  entryDate: Date;

  @Exclude()
  user: UserDto;

  referral: ReferralDto;

  constructor(partial: Partial<RecommendationDto>) {
    Object.assign(this, partial);
  }
}

export class ReferralDto {
  email: string;
  username: string;

  @Exclude()
  id: number;

  @Exclude()
  password: string;

  @Exclude()
  isActive: boolean;

  @Exclude()
  entryDate: Date;

  constructor(partial: Partial<ReferralDto>) {
    Object.assign(this, partial);
  }
}
