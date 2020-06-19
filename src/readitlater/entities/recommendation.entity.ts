import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  entryDate: Date;

  @ManyToOne((type) => User, (user) => user.recommendations)
  user: User;

  @ManyToOne((type) => User)
  referral: User;
}
