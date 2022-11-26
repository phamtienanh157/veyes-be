import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { EyewearModule } from './eyewear/eyewear.module';
import { OrderModule } from './order/order.module';
import { AccountModule } from './account/account.module';
import { CommentModule } from './comment/comment.module';
import { BrandModule } from './brand/brand.module';
import { TypeModule } from './type/type.module';
import { ShipmentModule } from './shipment/shipment.module';
import { SuggestionModule } from './suggestion/suggestion.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  ],
})
export class AppModule {}
