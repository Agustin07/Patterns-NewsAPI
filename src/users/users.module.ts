import { Module } from '@nestjs/common';
import UsersController from './users.controller';
import UsersService from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Article } from './../readitlater/entities/article.entity';
import { Recommendation } from './../readitlater/entities/recommendation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Article, Recommendation])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
