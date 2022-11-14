import { Module } from '@nestjs/common';
import { EyewearService } from './eyewear.service';
import { EyewearController } from './eyewear.controller';
import { Eyewear } from './entity/eyewear.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entity/brand.entity';
import Type from './entity/type.entity';
import ColorCollection from './entity/colorCollection.entity';
import ImageCollection from './entity/imageCollection.entity';
import { CartEyewear } from 'src/order/entity/cartEyewear.entity';
import { Comment } from 'src/comment/entity/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Eyewear,
      Brand,
      Type,
      ColorCollection,
      ImageCollection,
      CartEyewear,
      Comment,
    ]),
  ],
  providers: [EyewearService],
  controllers: [EyewearController],
})
export class EyewearModule {}
