import { Eyewear } from 'src/eyewear/entity/eyewear.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartEyewear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  colorCode: string;

  @ManyToOne(() => Eyewear, (eyewear: Eyewear) => eyewear.cartEyewear)
  eyewear: Eyewear;

  @ManyToOne(() => Cart, (cart: Cart) => cart.cartEyewear)
  cart: Cart;
}
