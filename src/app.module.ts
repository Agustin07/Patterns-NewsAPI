import { Module, HttpModule } from '@nestjs/common';
import AppController from './app.controller';
import AppService from './app.service';
import { NewsModule } from './news/news.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReaditlaterModule } from './readitlater/readitlater.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    NewsModule,
    ReaditlaterModule,
    AuthModule,
    UsersModule,
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'newsdb',
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
