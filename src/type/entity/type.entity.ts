import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Eyewear } from '../../eyewear/entity/eyewear.entity';

@Entity()
class Type {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => Eyewear, (eyewear: Eyewear) => eyewear.type)
  public eyewear: Eyewear[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

export default Type;
