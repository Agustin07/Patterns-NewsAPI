import { IsString, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  url: string;
}

export class ArticleDto {
  id: number;
  url: string;
  entryDate: Date;

  @Exclude()
  user: UserDto;

  constructor(partial: Partial<ArticleDto>) {
    Object.assign(this, partial);
  }
}
