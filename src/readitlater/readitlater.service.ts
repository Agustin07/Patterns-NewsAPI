import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/article.dto';
import { Article } from './entities/article.entity';
import { Recommendation } from './entities/recommendation.entity';
import { User } from '../users/entities/user.entity';
import {
  CreateRecommendationDto,
  ReferralDto,
  ReferenceDto,
} from './dto/recommendation.dto';

@Injectable()
export class ReaditlaterService {
  constructor(
    @InjectRepository(Article)
    private repoArticles: Repository<Article>,
    @InjectRepository(Recommendation)
    private repoRecommend: Repository<Recommendation>,
    @InjectRepository(User)
    private repoUsers: Repository<User>,
  ) {}

  async saveArticle(data: CreateArticleDto, id: number) {
    const user = await this.repoUsers.findOne(id);
    if (!user)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'User does not exists!' },
        HttpStatus.NOT_FOUND,
      );
    let article = new Article();
    article.url = data.url;
    article.user = user;
    return await this.repoArticles.save(article);
  }

  async getArticles(id: number) {
    return await this.repoArticles.find({ where: { user: id } });
  }

  async sendRecommendation(data: CreateRecommendationDto, id: number) {
    const user = await this.repoUsers.findOne(data.userid);
    if (!user)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'User does not exists!' },
        HttpStatus.NOT_FOUND,
      );

    const referral = await this.repoUsers.findOne(id);
    if (!referral)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'User Referral does not exists!',
        },
        HttpStatus.NOT_FOUND,
      );

    let recommendation = new Recommendation();
    recommendation.url = data.url;
    recommendation.user = user;
    recommendation.referral = referral;
    return await this.repoRecommend.save(recommendation);
  }

  async getRecommendations(id: number) {
    let recommendations = await this.repoRecommend.find({
      select: ['id', 'url', 'entryDate', 'referral'],
      where: { user: id },
      relations: ['referral'],
    });
    const result = recommendations.map((item) => {
      const { referral, ...recommend } = item;
      const userreferral = new ReferralDto(referral);
      return new ReferenceDto({ ...recommend, referral: userreferral });
    });
    return result;
  }
}
