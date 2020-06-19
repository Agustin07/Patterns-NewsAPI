import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  entryDate: Date;

  @ManyToOne((type) => User, (user) => user.articles)
  user: User;
}
