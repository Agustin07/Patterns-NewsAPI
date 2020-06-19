import {
  IsString,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsDefined,
  IsNumberString,
} from 'class-validator';

export class NewsDto { 
  constructor(
    // ? these are added as class properties
    public title: string,
    public url: string,
    public publishedDate: string,
    public section: string,
    public source: string,
  ) {}
}

export class ParamsNewsDto {
  @IsDefined()
  @IsString()
  @IsIn(['nyt', 'tg', 'news', 'all'])
  api: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  q: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  oncontent: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  onsection: string;

  @IsOptional()
  @IsNotEmpty()
  @IsISO8601()
  fromdate: string;

  @IsOptional()
  @IsNotEmpty()
  @IsISO8601()
  todate: string;

  @IsOptional()
  @IsNumberString()
  @IsNotEmpty()
  onpage: number;
}
