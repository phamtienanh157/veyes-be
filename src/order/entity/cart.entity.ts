import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartEyewear } from './cartEyewear.entity';
import { Order } from './order.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Order, (order: Order) => order.cart)
  order: Order[];

  @OneToMany(() => CartEyewear, (cartEyewear: CartEyewear) => cartEyewear.cart)
  cartEyewear: CartEyewear[];
}
