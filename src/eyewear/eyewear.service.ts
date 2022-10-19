import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entity/brand.entity';
import { Eyewear } from './entity/eyewear.entity';
import Type from './entity/type.entity';
import { IListBrandRes, IListEyewearRes, IListTypeRes } from './eyewear.types';

@Injectable()
export class EyewearService {
  constructor(
    @InjectRepository(Eyewear)
    private readonly eyewearRepository: Repository<Eyewear>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async getAll(): Promise<IListEyewearRes[]> {
    const list = await this.eyewearRepository.find({
      relations: {
        brand: true,
        type: true,
        colorCollection: true,
        imageCollection: true,
      },
    });
    return list;
  }

  async getOneByCode(code: string): Promise<Eyewear> {
    return this.eyewearRepository.findOne({
      where: { code },
      relations: {
        brand: true,
        type: true,
        colorCollection: true,
        imageCollection: true,
      },
    });
  }

  async getListBrand(): Promise<IListBrandRes[]> {
    const list = await this.brandRepository.find();
    return list;
  }

  async getListType(): Promise<IListTypeRes[]> {
    const list = await this.typeRepository.find();
    return list;
  }
}
