import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Type from 'src/type/entity/type.entity';
import { Repository } from 'typeorm';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async getListType() {
    return await this.typeRepository.find();
  }

  async updateType(body: UpdateTypeDto) {
    const type = new Type();
    if (body.id) {
      type.id = body.id;
    }
    type.name = body.name;
    return await this.typeRepository.save(type);
  }

  async deleteType(id: number) {
    return await this.typeRepository.delete({ id });
  }
}
