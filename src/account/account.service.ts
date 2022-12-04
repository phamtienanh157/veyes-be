import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/auth/entity/customer.entity';
import { User } from 'src/auth/entity/user.entity';
import { ERole, EStatus } from 'src/common/constants';
import { helpSearch } from 'src/utils';
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
    const customer = await this.customerRepository.findOneBy({
      user: { id: id },
    });
    return {
      ...customer,
      role: user.role,
      username: user.username,
      email: user.email,
    };
  }

  async saveUserInfo(body: SaveUserInfoDto): Promise<ISaveUserInfoRes> {
    const { id, name, phoneNumber, address } = body;
    const customer = await this.customerRepository.findOneBy({ id });
    customer.address = address;
    customer.name = name;
    customer.phoneNumber = phoneNumber;
    this.customerRepository.save(customer);
    return {
      message: 'Success',
    };
  }

  async getAll(keyword: string, pageParam: number) {
    let list = await this.userRepository.find({
      where: { role: ERole.USER },
      relations: {
        customer: true,
      },
    });
    if (keyword) {
      list = list.filter(
        (item) =>
          helpSearch(item.customer.name, keyword) ||
          helpSearch(item.customer.phoneNumber, keyword) ||
          helpSearch(item.email, keyword) ||
          helpSearch(item.customer.address, keyword),
      );
    }
    const temp = list.map((item) => ({
      createdAt: item.createdAt,
      name: item.customer.name,
      email: item.email,
      address: item.customer.address,
      phoneNumber: item.customer.phoneNumber,
      status: item.status,
      id: item.id,
    }));

    const limit = 12;
    const page = +pageParam || 1;

    const totalPages = Math.ceil(temp.length / limit);
    let res = [];

    const start = (page - 1) * limit;
    const end = start + limit;
    res = temp.slice(start, end);

    return {
      listUser: res,
      totalPages,
    };
  }

  async changeStatus(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    switch (user.status) {
      case EStatus.ACTIVE:
        user.status = EStatus.INACTIVE;
        break;
      case EStatus.INACTIVE:
        user.status = EStatus.ACTIVE;
        break;
    }
    this.userRepository.save(user);
    return {
      message: 'Success',
    };
  }
}
