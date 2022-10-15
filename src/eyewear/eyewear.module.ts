import { Module } from '@nestjs/common';
import { EyewearService } from './eyewear.service';
import { EyewearController } from './eyewear.controller';
import { Eyewear } from './entity/eyewear.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import ColorCollection from './entity/colorCollection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Eyewear, ColorCollection])],
  providers: [EyewearService],
  controllers: [EyewearController],
})
export class EyewearModule {}
