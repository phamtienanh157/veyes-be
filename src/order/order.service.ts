import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async createOrder(body: CreateOrderDto) {
    const { totalPrice, paymentId, shipmentId, cart } = body;

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
    return this.orderRepository.save(order);
  }
}
