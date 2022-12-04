import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/auth/entity/customer.entity';
import { User } from 'src/auth/entity/user.entity';
import { Eyewear } from 'src/eyewear/entity/eyewear.entity';
import { Repository } from 'typeorm';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Cart } from './entity/cart.entity';
import { CartEyewear } from './entity/cartEyewear.entity';
import { Order } from './entity/order.entity';
import { Payment } from './entity/payment.entity';
import { Shipment } from '../shipment/entity/shipment.entity';
import { IGetOrderRes } from './order.types';
import { helpSearch } from 'src/utils';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
    @InjectRepository(Eyewear)
    private readonly eyewearRepository: Repository<Eyewear>,
    @InjectRepository(CartEyewear)
    private readonly cartEyewearRepository: Repository<CartEyewear>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createOrder(body: CreateOrderDto, userId: number) {
    const { totalPrice, paymentId, shipmentId, cart, customer, note } = body;

    // const user = await this.userRepository.findOneBy({ id: userId });
    const thisCustomer = await this.customerRepository.findOneBy({
      user: { id: userId },
    });
    thisCustomer.address = customer.address;
    thisCustomer.name = customer.name;
    thisCustomer.phoneNumber = customer.phoneNumber;
    await this.customerRepository.save(thisCustomer);

    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });
    const shipment = await this.shipmentRepository.findOne({
      where: { id: shipmentId },
    });

    const newCart = new Cart();
    await this.cartRepository.save(newCart);

    cart.forEach(async (item) => {
      const cartEyewear = new CartEyewear();
      const eyewear = await this.eyewearRepository.findOne({
        where: { id: item.eyewearId },
      });
      cartEyewear.quantity = item.quantity;
      cartEyewear.cart = newCart;
      cartEyewear.eyewear = eyewear;
      cartEyewear.colorCode = item.colorCode;
      this.cartEyewearRepository.save(cartEyewear);
    });

    const order = new Order();
    order.cart = newCart;
    order.totalPrice = totalPrice;
    order.payment = payment;
    order.shipment = shipment;
    order.customer = thisCustomer;
    order.note = note;
    return this.orderRepository.save(order);
  }

  async getPayment() {
    return await this.paymentRepository.find();
  }

  async getListByCustomer(id: number): Promise<IGetOrderRes[]> {
    const customer = await this.customerRepository.findBy({ user: { id } });
    const listOrder = await this.orderRepository.find({
      where: { customer },
      relations: {
        cart: true,
      },
    });
    const list = await Promise.all(
      listOrder.map(async (order) => {
        const listProduct = await this.cartEyewearRepository.find({
          relations: {
            eyewear: true,
          },
          where: {
            cart: {
              id: order.cart.id,
            },
          },
        });
        return {
          ...order,
          cart: listProduct,
        };
      }),
    );

    return list;
  }

  async getListOrder(keyword: string, pageParam: number) {
    let listOrder = await this.orderRepository.find({
      order: { createdAt: 'DESC' },
      relations: {
        customer: true,
      },
    });
    if (keyword) {
      listOrder = listOrder.filter(
        (item) =>
          helpSearch(item.customer.name, keyword) ||
          helpSearch(item.customer.phoneNumber, keyword),
      );
    }

    const limit = 12;
    const page = +pageParam || 1;

    const totalPages = Math.ceil(listOrder.length / limit);
    let res = [];

    const start = (page - 1) * limit;
    const end = start + limit;
    res = listOrder.slice(start, end);

    return { listOrder: res, totalPages };
  }

  async getOrderDetail(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        cart: true,
        payment: true,
        shipment: true,
        customer: true,
      },
    });

    const listProduct = await this.cartEyewearRepository.find({
      relations: {
        eyewear: true,
      },
      where: {
        cart: {
          id: order.cart.id,
        },
      },
    });
    return {
      ...order,
      cart: listProduct,
    };
  }

  async changeStatus(body: ChangeStatusDto) {
    const order = await this.orderRepository.findOneBy({ id: body.orderId });
    order.status = body.status;
    await this.orderRepository.save(order);
    return {
      message: 'Success',
    };
  }
}
