import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Eyewear } from './eyewear.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => Eyewear, (eyewear: Eyewear) => eyewear.brand)
  public eyewear: Eyewear[];
}
