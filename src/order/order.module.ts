import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/auth/entity/customer.entity';
import { User } from 'src/auth/entity/user.entity';
import { Eyewear } from 'src/eyewear/entity/eyewear.entity';
import { Cart } from './entity/cart.entity';
import { CartEyewear } from './entity/cartEyewear.entity';
import { Order } from './entity/order.entity';
import { Payment } from './entity/payment.entity';
import { Shipment } from '../shipment/entity/shipment.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Cart,
      Payment,
      Shipment,
      Eyewear,
      CartEyewear,
      Customer,
      User,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, AuthService, JwtService],
})
export class OrderModule {}
