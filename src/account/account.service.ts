import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/auth/entity/customer.entity';
import { User } from 'src/auth/entity/user.entity';
import { Repository } from 'typeorm';
import { IGetUser } from './account.interface';
import { ISaveUserInfoRes } from './account.types';
import { SaveUserInfoDto } from './dto/save-user-info.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getByUserId(id: number): Promise<IGetUser> {
    const user = await this.userRepository.findOneBy({ id });
    const customer = await this.customerRepository.findOneBy({ user });
    return {
      ...customer,
      role: user.role,
      username: user.username,
    };
  }

  async saveUserInfo(body: SaveUserInfoDto): Promise<ISaveUserInfoRes> {
    const { id, name, phoneNumber, email, address } = body;
    const customer = await this.customerRepository.findOneBy({ id });
    customer.address = address;
    customer.email = email;
    customer.name = name;
    customer.phoneNumber = phoneNumber;
    this.customerRepository.save(customer);
    return {
      message: 'Success',
    };
  }
}
