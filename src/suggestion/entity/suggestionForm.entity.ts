import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SuggestionForm {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public value: number;

  @Column()
  public step: number;
}
