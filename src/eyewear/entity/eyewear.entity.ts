import { Comment } from 'src/comment/entity/comment.entity';
import { CartEyewear } from 'src/order/entity/cartEyewear.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import ColorCollection from './colorCollection.entity';
import ImageCollection from './imageCollection.entity';
import Type from './type.entity';

@Entity()
export class Eyewear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  maxQuantity: string;

  @Column()
  code: string;

  @Column()
  thumbnail: string;

  @ManyToOne(() => Brand, (brand: Brand) => brand.eyewear)
  brand: Brand;

  @ManyToOne(() => Type, (type: Type) => type.eyewear)
  type: Type;

  @OneToMany(
    () => ImageCollection,
    (imageCollection: ImageCollection) => imageCollection.eyewear,
  )
  imageCollection: ImageCollection[];

  @OneToMany(
    () => ColorCollection,
    (colorCollection: ColorCollection) => colorCollection.eyewear,
  )
  colorCollection: ColorCollection[];

  @OneToMany(
    () => CartEyewear,
    (cartEyewear: CartEyewear) => cartEyewear.eyewear,
  )
  cartEyewear: CartEyewear[];

  @OneToMany(() => Comment, (comment: Comment) => comment.eyewear)
  comment: Comment[];
}
