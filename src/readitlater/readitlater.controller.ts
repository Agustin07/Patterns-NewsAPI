import {
  Controller,
  UseGuards,
  Get,
  Body,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateArticleDto, ArticleDto } from './dto/article.dto';
import { ReaditlaterService } from './readitlater.service';
import {
  RecommendationDto,
  CreateRecommendationDto,
} from './dto/recommendation.dto';

@Controller()
export class ReaditlaterController {
  constructor(private readonly readItLaterService: ReaditlaterService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/articles')
  getArticles(@User() user: UserDto) {
    return this.readItLaterService.getArticles(user.id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('/recommendations')
  getRecommendations(@User() user: UserDto) {
    return this.readItLaterService.getRecommendations(user.id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('/articles')
  async saveArticle(@Body() article: CreateArticleDto, @User() user: UserDto) {
    const result = await this.readItLaterService.saveArticle(article, user.id);
    return new ArticleDto(result);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('/recommendations')
  async sendRecommendation(
    @Body() recommendation: CreateRecommendationDto,
    @User() user: UserDto,
  ) {
    const result = await this.readItLaterService.sendRecommendation(
      recommendation,
      user.id,
    );
    return new RecommendationDto(result);
  }
}
