import { Module } from '@nestjs/common';
import { EyewearService } from './eyewear.service';
import { EyewearController } from './eyewear.controller';
import { Eyewear } from './entity/eyewear.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entity/brand.entity';
import Type from './entity/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Eyewear, Brand, Type])],
  providers: [EyewearService],
  controllers: [EyewearController],
})
export class EyewearModule {}
