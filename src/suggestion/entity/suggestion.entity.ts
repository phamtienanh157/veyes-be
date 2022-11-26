import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Suggestion {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public gender: number;

  @Column()
  public age: number;

  @Column()
  public faceForm: number;

  @Column()
  public material: string;

  @Column()
  public glassForm: string;

  @Column()
  public suggestion: string;
}
