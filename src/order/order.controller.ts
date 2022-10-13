import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(200)
  createOrder(@Body() body: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(body);
  }
}
