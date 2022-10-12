import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eyewear } from 'src/eyewear/entity/eyewear.entity';
import { Cart } from './entity/cart.entity';
import { Order } from './entity/order.entity';
import { Payment } from './entity/payment.entity';
import { Shipment } from './entity/shipment.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Cart, Payment, Shipment, Eyewear]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
