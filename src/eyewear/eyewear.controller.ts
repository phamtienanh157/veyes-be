import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { ERole } from 'src/common/constants';
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
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.eyewearService.getListEyewear(
      keyword,
      brand,
      type,
      price,
      page,
      limit,
    );
  }

  @Get('all')
  @HttpCode(200)
  async getAll() {
    return this.eyewearService.getAll();
  }

  @Get('item')
  getEyewearByCode(@Query('code') code: string, @Query('id') id: number) {
    if (code) return this.eyewearService.getOneByCode(code);
    return this.eyewearService.getOneById(id);
  }

  @Post()
  @UseGuards(RoleGuard)
  @UseGuards(JWTGuard)
  @Roles(ERole.ADMIN)
  @HttpCode(200)
  async saveEyewear(@Body() body: CreateEyewearDto): Promise<ISaveEyewearRes> {
    return this.eyewearService.saveEyewear(body);
  }

  @Delete()
  @UseGuards(RoleGuard)
  @UseGuards(JWTGuard)
  @Roles(ERole.ADMIN)
  @HttpCode(200)
  async deleteOne(@Query('id') id: number): Promise<IEyewearRes> {
    return this.eyewearService.deleteOne(id);
  }
}
