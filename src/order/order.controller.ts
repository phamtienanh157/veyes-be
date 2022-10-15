import { Controller, Post, Body, HttpCode, Get } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';
import { Payment } from './entity/payment.entity';
import { Shipment } from './entity/shipment.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(200)
  createOrder(@Body() body: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(body);
  }

  @Get('payment')
  @HttpCode(200)
  getPayment(): Promise<Payment[]> {
    return this.orderService.getPayment();
  }

  @Get('shipment')
  @HttpCode(200)
  getShipment(): Promise<Shipment[]> {
    return this.orderService.getShipment();
  }
}
