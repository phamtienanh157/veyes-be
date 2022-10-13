import { Controller, Get, Query } from '@nestjs/common';
import { User } from 'src/auth/decorator/get-user.decorator';
import { Customer } from 'src/auth/entity/customer.entity';
import { EyewearService } from './eyewear.service';

@Controller('eyewears')
export class EyewearController {
  constructor(private readonly eyewearService: EyewearService) {}

  @Get()
  getListEyewear(@User() customer: Customer) {
    console.log(customer);
    return this.eyewearService.getAll();
  }

  @Get('item')
  getEyewearByCode(@Query('code') code: string) {
    return this.eyewearService.getOneByCode(code);
  }
}
