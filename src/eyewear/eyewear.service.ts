import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Eyewear } from './entity/eyewear.entity';

@Injectable()
export class EyewearService {
  constructor(
    @InjectRepository(Eyewear)
    private readonly eyewearRepository: Repository<Eyewear>,
  ) {}

  async getAll(): Promise<Eyewear[]> {
    return this.eyewearRepository.find();
  }

  async getOneByCode(code: string): Promise<Eyewear> {
    return this.eyewearRepository.findOneBy({ code });
  }
}
