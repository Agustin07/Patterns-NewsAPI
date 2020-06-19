import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import NewsService from './news.service';
import NYTimesService from './nytimes.service';
import GuardianService from './guardian.service';
import { HttpModule } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [NewsController],
  providers: [NewsService, NYTimesService, GuardianService],
})
export class NewsModule {}
