import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { CommentModule } from './comment/comment.module';
import { DatabaseModule } from './database/database.module';
import { EyewearModule } from './eyewear/eyewear.module';
import { MailModule } from './mail/mail.module';
import { OrderModule } from './order/order.module';
import { ShipmentModule } from './shipment/shipment.module';
import { SuggestionModule } from './suggestion/suggestion.module';
import { TypeModule } from './type/type.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    EyewearModule,
    OrderModule,
    AccountModule,
    CommentModule,
    BrandModule,
    TypeModule,
    ShipmentModule,
    SuggestionModule,
    MailModule,
    StatisticModule,
  ],
})
export class AppModule {}
