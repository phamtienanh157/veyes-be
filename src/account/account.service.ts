import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/auth/entity/customer.entity';
import { User } from 'src/auth/entity/user.entity';
import { Repository } from 'typeorm';
import { IGetUser } from './account.interface';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(body: GetUserDto): Promise<IGetUser> {
    const { userId } = body;
    const user = await this.userRepository.findOneBy({ id: userId });
    const customer = await this.customerRepository.findOneBy({ user });
    return {
      ...customer,
      role: user.role,
      username: user.username,
    };
  }
}
