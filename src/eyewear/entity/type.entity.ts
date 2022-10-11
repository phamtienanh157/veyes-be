import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Eyewear } from './eyewear.entity';

@Entity()
class Type {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => Eyewear, (eyewear: Eyewear) => eyewear.type)
  public eyewear: Eyewear[];
}

export default Type;
