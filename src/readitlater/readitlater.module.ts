import { Module } from '@nestjs/common';
import { ReaditlaterController } from './readitlater.controller';
import { ReaditlaterService } from './readitlater.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../users/entities/user.entity';
import { Article } from './entities/article.entity';
import { Recommendation } from './entities/recommendation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Article, Recommendation])],
  controllers: [ReaditlaterController],
  providers: [ReaditlaterService],
})
export class ReaditlaterModule {}
