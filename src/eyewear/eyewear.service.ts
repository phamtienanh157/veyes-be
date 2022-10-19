import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ColorCollection from './entity/colorCollection.entity';
import { Eyewear } from './entity/eyewear.entity';
import { IListEyewearRes } from './eyewear.types';

@Injectable()
export class EyewearService {
  constructor(
    @InjectRepository(Eyewear)
    private readonly eyewearRepository: Repository<Eyewear>,
    @InjectRepository(ColorCollection)
    private readonly colorCollectionRepository: Repository<ColorCollection>,
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
}
