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
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { ERole } from 'src/common/constants';
import { Brand } from 'src/eyewear/entity/brand.entity';
import { BrandService } from './brand.service';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { JWTGuard } from '../auth/guards/jwt.guard';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @HttpCode(200)
  getListBrand(): Promise<Brand[]> {
    return this.brandService.getListBrand();
  }

  @Post()
  @UseGuards(RoleGuard)
  @UseGuards(JWTGuard)
  @Roles(ERole.ADMIN)
  @HttpCode(200)
  updateBrand(@Body() body: UpdateBrandDto): Promise<Brand> {
    return this.brandService.updateBrand(body);
  }

  @Delete()
  @UseGuards(RoleGuard)
  @UseGuards(JWTGuard)
  @Roles(ERole.ADMIN)
  @HttpCode(200)
  deleteBrand(@Query('id') id: number) {
    return this.brandService.deleteBrand(id);
  }
}
