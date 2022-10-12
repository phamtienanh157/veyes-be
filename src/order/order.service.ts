import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Cart } from './entity/cart.entity';
import { Order } from './entity/order.entity';
import { Payment } from './entity/payment.entity';
import { Shipment } from './entity/shipment.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly cartRepository: Repository<Cart>,
    private readonly paymentRepository: Repository<Payment>,
    private readonly shipmentRepository: Repository<Shipment>,
  ) {}

  async createOrder(body: CreateOrderDto) {
    const { totalPrice, paymentId, shipmentId, cart } = body;

    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });
    const shipment = await this.shipmentRepository.findOne({
      where: { id: shipmentId },
    });

    // const cartDb = this.cartRepository.create(cart);
    // const order = this.orderRepository.create(body);
    // return this.orderRepository.save(question);
  }
}
