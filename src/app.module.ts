import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { EyewearModule } from './eyewear/eyewear.module';
import { OrderModule } from './order/order.module';
import { AccountModule } from './account/account.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    EyewearModule,
    OrderModule,
    AccountModule,
    CommentModule,
  ],
})
export class AppModule {}
