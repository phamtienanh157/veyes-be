import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/auth/entity/customer.entity';
import { User } from 'src/auth/entity/user.entity';
import { Eyewear } from 'src/eyewear/entity/eyewear.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Cart } from './entity/cart.entity';
import { CartEyewear } from './entity/cartEyewear.entity';
import { Order } from './entity/order.entity';
import { Payment } from './entity/payment.entity';
import { Shipment } from './entity/shipment.entity';

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

  async createOrder(body: CreateOrderDto) {
    const { totalPrice, paymentId, shipmentId, cart, customer, userId } = body;

    const user = await this.userRepository.findOneBy({ id: userId });
    const thisCustomer = await this.customerRepository.findOneBy({ user });
    thisCustomer.address = customer.address;
    thisCustomer.name = customer.name;
    thisCustomer.email = customer.email;
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
    return this.orderRepository.save(order);
  }

  async getPayment() {
    return await this.paymentRepository.find();
  }

  async getShipment() {
    return await this.shipmentRepository.find();
  }
}
