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
import { DeleteEyewearDto } from './dto/delete-eyewear.dto';
import { Eyewear } from './entity/eyewear.entity';
import { EyewearService } from './eyewear.service';
import { IEyewearRes, ISaveEyewearRes } from './eyewear.types';

@Controller('eyewears')
export class EyewearController {
  constructor(private readonly eyewearService: EyewearService) {}

  @Get()
  @HttpCode(200)
  async getListEyewear() {
    return this.eyewearService.getAll();
  }

  @Get('item')
  getEyewearByCode(@Query('code') code: string) {
    return this.eyewearService.getOneByCode(code);
  }

  @Get('brands')
  @HttpCode(200)
  async getListBrand() {
    return this.eyewearService.getListBrand();
  }

  @Get('types')
  @HttpCode(200)
  async getListType() {
    return this.eyewearService.getListType();
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
