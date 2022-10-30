import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/eyewear/entity/brand.entity';
import { Repository } from 'typeorm';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async getListBrand() {
    return await this.brandRepository.find();
  }

  async updateBrand(body: UpdateBrandDto) {
    const brand = new Brand();
    if (body.id) {
      brand.id = body.id;
    }
    brand.name = body.name;
    return await this.brandRepository.save(brand);
  }

  async deleteBrand(id: number) {
    return await this.brandRepository.delete({ id });
  }
}
