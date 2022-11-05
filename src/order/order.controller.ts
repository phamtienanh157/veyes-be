import { IGetOrderRes } from './order.types';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';
import { Payment } from './entity/payment.entity';
import { OrderService } from './order.service';
import { ChangeStatusDto } from './dto/change-status.dto';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { ERole } from 'src/common/constants';

@UseGuards(RoleGuard)
@UseGuards(JWTGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(ERole.USER)
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
  getListOrder(@Request() request): Promise<IGetOrderRes[]> {
    return this.orderService.getListOrderByCustomer(request.user.id);
  }

  @Get('getAll')
  @Roles(ERole.ADMIN)
  @HttpCode(200)
  getAll(): Promise<Order[]> {
    return this.orderService.getListOrder();
  }

  @Get('detail')
  @HttpCode(200)
  getOrderDetail(@Query('id') id: number) {
    return this.orderService.getOrderDetail(id);
  }

  @Post('status')
  @Roles(ERole.ADMIN)
  @HttpCode(200)
  changeStatus(@Body() body: ChangeStatusDto) {
    return this.orderService.changeStatus(body);
  }
}
