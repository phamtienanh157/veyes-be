import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/auth/entity/customer.entity';
import { Eyewear } from 'src/eyewear/entity/eyewear.entity';
import { Order } from 'src/order/entity/order.entity';
import Type from 'src/type/entity/type.entity';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Eyewear, Order, Customer, Type])],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
