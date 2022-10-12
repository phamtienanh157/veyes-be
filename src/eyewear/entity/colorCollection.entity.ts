import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Eyewear } from './eyewear.entity';

@Entity()
class ColorCollection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @ManyToOne(() => Eyewear, (eyewear: Eyewear) => eyewear.colorCollection)
  eyewear: Eyewear;
}

export default ColorCollection;
