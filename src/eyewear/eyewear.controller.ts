import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { CreateEyewearDto } from './dto/create-eyewear.dto';
import { EyewearService } from './eyewear.service';
import { IEyewearRes, ISaveEyewearRes } from './eyewear.types';

@Controller('eyewears')
export class EyewearController {
  constructor(private readonly eyewearService: EyewearService) {}

  @Get()
  @HttpCode(200)
  async getListEyewear(
    @Query('keyword') keyword: string,
    @Query('brand') brand: number,
    @Query('type') type: number,
    @Query('price') price: number,
  ) {
    return this.eyewearService.getAll(keyword, brand, type, price);
  }

  @Get('item')
  getEyewearByCode(@Query('code') code: string) {
    return this.eyewearService.getOneByCode(code);
  }

  @Post()
  @HttpCode(200)
  async saveEyewear(@Body() body: CreateEyewearDto): Promise<ISaveEyewearRes> {
    return this.eyewearService.saveEyewear(body);
  }

  @Delete()
  @HttpCode(200)
  async deleteOne(@Query('id') id: number): Promise<IEyewearRes> {
    return this.eyewearService.deleteOne(id);
  }
}
