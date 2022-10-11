import { Comment } from 'src/comment/entity/comment.entity';
import { Order } from 'src/order/entity/order.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @OneToOne(() => User)
  user: User;

  @OneToMany(() => Order, (order: Order) => order.customer)
  public order: Order[];

  @OneToMany(() => Comment, (comment: Comment) => comment.customer)
  comment: Comment[];
}
