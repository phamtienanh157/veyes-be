import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { Brand } from 'src/eyewear/entity/brand.entity';
import { BrandService } from './brand.service';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @HttpCode(200)
  getListBrand(): Promise<Brand[]> {
    return this.brandService.getListBrand();
  }

  @Post()
  @HttpCode(200)
  updateBrand(@Body() body: UpdateBrandDto): Promise<Brand> {
    return this.brandService.updateBrand(body);
  }

  @Delete()
  @HttpCode(200)
  deleteBrand(@Query('id') id: number) {
    return this.brandService.deleteBrand(id);
  }
}
