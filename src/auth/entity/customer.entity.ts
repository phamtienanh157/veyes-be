import { Comment } from 'src/comment/entity/comment.entity';
import { Order } from 'src/order/entity/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Order, (order: Order) => order.customer)
  order: Order[];

  @OneToMany(() => Comment, (comment: Comment) => comment.customer)
  comment: Comment[];
}
