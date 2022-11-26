import { Customer } from 'src/auth/entity/customer.entity';
import { EOrderStatus } from 'src/common/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Payment } from './payment.entity';
import { Shipment } from '../../shipment/entity/shipment.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: EOrderStatus,
    default: EOrderStatus.WAITING_FOR_CONFIRM,
  })
  status: EOrderStatus;

  @ManyToOne(() => Customer, (customer: Customer) => customer.order)
  customer: Customer;

  @ManyToOne(() => Cart, (cart: Cart) => cart.order)
  cart: Cart;

  @ManyToOne(() => Payment, (payment: Payment) => payment.order)
  payment: Payment;

  @ManyToOne(() => Shipment, (shipment: Shipment) => shipment.order)
  shipment: Shipment;
}
