import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import NewsService from './news.service';
import NYTimesService from './nytimes.service';
import GuardianService from './guardian.service';
import { ParamsNewsDto, NewsDto } from './dto/news.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { clientCode } from './clientcode.const';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly nytimesService: NYTimesService,
    private readonly guardianService: GuardianService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getNews(@Query() query: ParamsNewsDto) {
    let result: NewsDto[] = [];
    switch (query.api) {
      case 'nyt':
        result = await clientCode(this.nytimesService,query);
        break;
      case 'tg':
        result = await clientCode(this.guardianService,query);
        break;
      case 'news':
        result = await clientCode(this.newsService,query);
        break;
      case 'all':
        result = result.concat(await clientCode(this.nytimesService,query));
        result = result.concat(await clientCode(this.guardianService,query));
        result = result.concat(await clientCode(this.newsService,query));
        break;
      default:
        throw new HttpException('NOT FOUND!', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}


