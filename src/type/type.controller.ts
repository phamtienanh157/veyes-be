import { TypeService } from './type.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import Type from 'src/eyewear/entity/type.entity';
import { UpdateTypeDto } from './dto/update-type.dto';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { ERole } from 'src/common/constants';
@UseGuards(RoleGuard)
@UseGuards(JWTGuard)
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  @HttpCode(200)
  getListType(): Promise<Type[]> {
    return this.typeService.getListType();
  }

  @Post()
  @Roles(ERole.ADMIN)
  @HttpCode(200)
  updateType(@Body() body: UpdateTypeDto): Promise<Type> {
    return this.typeService.updateType(body);
  }

  @Delete()
  @Roles(ERole.ADMIN)
  @HttpCode(200)
  deleteType(@Query('id') id: number) {
    return this.typeService.deleteType(id);
  }
}
