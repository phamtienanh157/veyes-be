import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Eyewear } from './eyewear.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Eyewear, (eyewear: Eyewear) => eyewear.brand)
  eyewear: Eyewear[];
}
