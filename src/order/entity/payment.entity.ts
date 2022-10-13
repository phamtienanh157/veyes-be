import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public methodName: string;

  @OneToMany(() => Order, (order: Order) => order.payment)
  public order: Order[];
}
