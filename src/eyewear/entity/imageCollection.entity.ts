import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Eyewear } from './eyewear.entity';

@Entity()
class ImageCollection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Eyewear, (eyewear: Eyewear) => eyewear.imageCollection)
  eyewear: Eyewear;
}

export default ImageCollection;
