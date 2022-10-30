import { IGetOrderRes } from './order.types';
import { Controller, Post, Body, HttpCode, Get, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';
import { Payment } from './entity/payment.entity';
import { OrderService } from './order.service';
import { ChangeStatusDto } from './dto/change-status.dto';

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

  @Get()
  @HttpCode(200)
  getListOrder(@Query('id') id: number): Promise<IGetOrderRes[] | Order[]> {
    if (id) {
      return this.orderService.getListOrderByCustomer(id);
    }
    return this.orderService.getListOrder();
  }

  @Get('detail')
  @HttpCode(200)
  getOrderDetail(@Query('id') id: number) {
    return this.orderService.getOrderDetail(id);
  }

  @Post('status')
  @HttpCode(200)
  changeStatus(@Body() body: ChangeStatusDto) {
    return this.orderService.changeStatus(body);
  }
}
