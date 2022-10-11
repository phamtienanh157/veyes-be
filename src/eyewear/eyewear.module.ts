import { Module } from '@nestjs/common';
import { EyewearService } from './eyewear.service';
import { EyewearController } from './eyewear.controller';
import { Eyewear } from './entity/eyewear.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Eyewear])],
  providers: [EyewearService],
  controllers: [EyewearController],
})
export class EyewearModule {}
