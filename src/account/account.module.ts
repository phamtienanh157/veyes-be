import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Customer } from 'src/auth/entity/customer.entity';
import { User } from 'src/auth/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
