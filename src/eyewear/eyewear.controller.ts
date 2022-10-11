import { Controller, Get } from '@nestjs/common';
import { EyewearService } from './eyewear.service';

@Controller('eyewear')
export class EyewearController {
  constructor(private readonly eyewearService: EyewearService) {}

  @Get()
  getListEyewear() {
    return this.eyewearService.getAll();
  }
}
