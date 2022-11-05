import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEyewearDto } from './dto/create-eyewear.dto';
import { Brand } from './entity/brand.entity';
import ColorCollection from './entity/colorCollection.entity';
import { Eyewear } from './entity/eyewear.entity';
import ImageCollection from './entity/imageCollection.entity';
import Type from './entity/type.entity';
import { IEyewearRes, IListEyewearRes, ISaveEyewearRes } from './eyewear.types';

const removeAccents = (text: string) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

const helpSearch = (text: string, keyword: string) =>
  removeAccents(text).toLocaleLowerCase().includes(keyword);

@Injectable()
export class EyewearService {
  constructor(
    @InjectRepository(Eyewear)
    private readonly eyewearRepository: Repository<Eyewear>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
    @InjectRepository(ColorCollection)
    private readonly colorCollectionRepository: Repository<ColorCollection>,
    @InjectRepository(ImageCollection)
    private readonly imageCollectionRepository: Repository<ImageCollection>,
  ) {}

  async getAll(
    keyword: string,
    brandId: number,
    typeId: number,
    price: number,
  ): Promise<IListEyewearRes[]> {
    const brand = await this.brandRepository.findOneBy({ id: brandId });
    const type = await this.typeRepository.findOneBy({ id: typeId });
    let list = await this.eyewearRepository.find({
      where: {
        brand: brand || false,
        type: type || false,
      },
      relations: {
        brand: true,
        type: true,
        colorCollection: true,
        imageCollection: true,
      },
    });
    if (keyword) {
      list = list.filter(
        (item) =>
          helpSearch(item.name, keyword) ||
          helpSearch(item.code, keyword) ||
          helpSearch(item.type.name, keyword) ||
          helpSearch(item.brand.name, keyword),
      );
    }
    if (+price) {
      list = list.sort(function (a, b) {
        if (+price === 1) return a.price - b.price;
        return b.price - a.price;
      });
    }
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

  async saveEyewear(body: CreateEyewearDto): Promise<ISaveEyewearRes> {
    const brand = await this.brandRepository.findOneBy({ id: body.brandId });
    const type = await this.typeRepository.findOneBy({ id: body.typeId });
    const eyewear = new Eyewear();
    if (body.id) eyewear.id = body.id;
    eyewear.name = body.name;
    eyewear.description = body.description;
    eyewear.price = body.price;
    eyewear.maxQuantity = body.maxQuantity;
    eyewear.code = body.code;
    eyewear.thumbnail = body.thumbnail;
    eyewear.brand = brand;
    eyewear.type = type;
    const savedEyewear = await this.eyewearRepository.save(eyewear);

    const listColor = await this.colorCollectionRepository.findBy({ eyewear });
    const listImage = await this.imageCollectionRepository.findBy({ eyewear });

    const colorCollectionBody = [...body.colorCollection].sort(
      (a, b) => a.id - b.id,
    );

    if (JSON.stringify(colorCollectionBody) !== JSON.stringify(listColor)) {
      await this.colorCollectionRepository.delete({ eyewear });
      body.colorCollection.forEach(async (item) => {
        const color = new ColorCollection();
        color.code = item.code;
        color.name = item.name;
        color.eyewear = savedEyewear;
        await this.colorCollectionRepository.save(color);
      });
    }
    const imageCollectionBody = [...body.imageCollection].sort(
      (a, b) => a.id - b.id,
    );

    if (JSON.stringify(imageCollectionBody) !== JSON.stringify(listImage)) {
      await this.imageCollectionRepository.delete({ eyewear });
      body.imageCollection.forEach(async (item) => {
        const image = new ImageCollection();
        image.url = item.url;
        image.eyewear = savedEyewear;
        await this.imageCollectionRepository.save(image);
      });
    }
    return {
      message: 'Success',
    };
  }

  async deleteOne(id: number): Promise<IEyewearRes> {
    const eyewear = await this.eyewearRepository.findOneBy({ id });
    await this.colorCollectionRepository.delete({ eyewear });
    await this.imageCollectionRepository.delete({ eyewear });
    await this.eyewearRepository.delete(id);
    return {
      message: 'Success',
    };
  }
}
