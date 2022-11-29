import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comment/entity/comment.entity';
import { LimitCount } from 'src/common/constants';
import { CartEyewear } from 'src/order/entity/cartEyewear.entity';
import { Repository } from 'typeorm';
import { CreateEyewearDto } from './dto/create-eyewear.dto';
import { Brand } from '../brand/entity/brand.entity';
import ColorCollection from './entity/colorCollection.entity';
import { Eyewear } from './entity/eyewear.entity';
import ImageCollection from './entity/imageCollection.entity';
import Type from '../type/entity/type.entity';
import { IEyewearRes, ISaveEyewearRes } from './eyewear.types';

const removeAccents = (text: string) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

const helpSearch = (text: string, keyword: string) => {
  const temp = removeAccents(keyword).toLocaleLowerCase();
  return removeAccents(text).toLocaleLowerCase().includes(temp);
};

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
    @InjectRepository(CartEyewear)
    private readonly cartEyewearRepository: Repository<CartEyewear>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getAll(
    keyword: string,
    brandId: number,
    typeId: number,
    price: number,
    pageParam: number,
    limitParam: number,
  ) {
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
    const page = +pageParam || 1;
    const limit = +limitParam || LimitCount;
    const totalPages = Math.ceil(list.length / limit);

    let res = [];

    const start = (page - 1) * limit;
    const end = start + limit;
    res = list.slice(start, end);

    const newProducts = ([...list].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    ).length = 4);

    return {
      listProduct: res,
      totalPages,
      limit,
      newProducts,
    };
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
    await this.cartEyewearRepository.delete({ eyewear });
    await this.commentRepository.delete({ eyewear });
    await this.eyewearRepository.delete(id);
    return {
      message: 'Success',
    };
  }
}
