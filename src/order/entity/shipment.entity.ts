import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public methodName: string;

  @Column()
  public price: number;

  @OneToMany(() => Order, (order: Order) => order.shipment)
  public order: Order[];
}
