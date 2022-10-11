import { Customer } from 'src/auth/entity/customer.entity';
import { Eyewear } from 'src/eyewear/entity/eyewear.entity';
import { CartEyewear } from 'src/order/entity/cartEyewear.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Eyewear, (eyewear: Eyewear) => eyewear.comment)
  eyewear: Eyewear;

  @ManyToOne(() => Customer, (customer: Customer) => customer.comment)
  customer: Customer;
}
