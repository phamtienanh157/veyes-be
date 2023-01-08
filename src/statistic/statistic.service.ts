import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/auth/entity/customer.entity';
import { EOrderStatus, ERole } from 'src/common/constants';
import { Eyewear } from 'src/eyewear/entity/eyewear.entity';
import { Order } from 'src/order/entity/order.entity';
import Type from 'src/type/entity/type.entity';
import { Repository } from 'typeorm';

const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Eyewear)
    private readonly eyewearRepository: Repository<Eyewear>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  filterByYear(date: Date, year: number) {
    const time = new Date(date);
    return time.getFullYear() == year;
  }

  async getStatistic(year: number) {
    let allProducts = await this.eyewearRepository.find({
      relations: {
        type: true,
      },
    });
    const originAllProducts = allProducts;
    allProducts = allProducts.filter((item) =>
      this.filterByYear(item.createdAt, year),
    );
    let allCustomers = await this.customerRepository.find({
      relations: { user: true },
    });
    const originAllCustomers = allCustomers;
    allCustomers = allCustomers.filter((item) =>
      this.filterByYear(item.user.createdAt, year),
    );
    let allOrders = await this.orderRepository.find();
    const originAllOrders = allOrders;

    allOrders = allOrders.filter((item) =>
      this.filterByYear(item.createdAt, year),
    );
    let allOrdersSuccess = allOrders.filter(
      (item) => item.status === EOrderStatus.COMPLETED,
    );
    const originOrdersSuccess = originAllOrders.filter(
      (item) => item.status === EOrderStatus.COMPLETED,
    );
    allOrdersSuccess = allOrdersSuccess.filter((item) =>
      this.filterByYear(item.createdAt, year),
    );
    const allType = await this.typeRepository.find();

    const allOrdersByMonth = Array(12).fill(0);
    const allOrdersSuccessByMonth = Array(12).fill(0);
    const allCustomerByMonth = Array(12).fill(0);
    const allTypeCount = [];

    allOrders.forEach((item) => {
      const time = new Date(item.createdAt);
      allOrdersByMonth[time.getMonth()]++;
      if (item.status === EOrderStatus.COMPLETED) {
        allOrdersSuccessByMonth[time.getMonth()]++;
      }
    });

    allCustomers.forEach((item) => {
      const time = new Date(item.user.createdAt);
      if (item.user.role === ERole.USER) allCustomerByMonth[time.getMonth()]++;
    });

    allType.forEach((item) => {
      const count = allProducts.filter((i) => i.type.id === item.id).length;
      allTypeCount.push({
        name: item.name,
        count,
      });
    });

    return {
      productsCount: originAllProducts.length,
      customersCount: originAllCustomers.length,
      ordersCount: originAllOrders.length,
      ordersSuccess: originOrdersSuccess.length,
      allOrdersByMonth,
      allOrdersSuccessByMonth,
      allCustomerByMonth,
      allTypeCount,
      years,
    };
  }
}
