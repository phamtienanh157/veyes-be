import { TypeService } from './type.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import Type from 'src/eyewear/entity/type.entity';
import { UpdateTypeDto } from './dto/update-type.dto';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  @HttpCode(200)
  getListType(): Promise<Type[]> {
    return this.typeService.getListType();
  }

  @Post()
  @HttpCode(200)
  updateType(@Body() body: UpdateTypeDto): Promise<Type> {
    return this.typeService.updateType(body);
  }

  @Delete()
  @HttpCode(200)
  deleteType(@Query('id') id: number) {
    return this.typeService.deleteType(id);
  }
}
