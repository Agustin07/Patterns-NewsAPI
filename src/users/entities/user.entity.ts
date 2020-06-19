import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Article } from './../../readitlater/entities/article.entity';
import { Recommendation } from './../../readitlater/entities/recommendation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'now()' })
  entryDate: Date;

  @OneToMany((type) => Article, (article) => article.user)
  articles: Article[];

  @OneToMany((type) => Recommendation, (recommendation) => recommendation.user)
  recommendations: Recommendation[];

  @OneToMany(
    (type) => Recommendation,
    (recommendation) => recommendation.referral,
  )
  referrals: Recommendation[];
}
