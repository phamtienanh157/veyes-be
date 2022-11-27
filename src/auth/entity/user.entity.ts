import { ERole } from 'src/common/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: ERole,
    default: ERole.USER,
  })
  role: ERole;

  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
