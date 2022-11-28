import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Type from 'src/type/entity/type.entity';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
