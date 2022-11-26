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
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { ERole } from 'src/common/constants';
import { Shipment } from 'src/shipment/entity/shipment.entity';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { ShipmentService } from './shipment.service';

@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get()
  @HttpCode(200)
  getListShipment(): Promise<Shipment[]> {
    return this.shipmentService.getListShipment();
  }

  @Post()
  @Roles(ERole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(JWTGuard)
  @HttpCode(200)
  updateShipment(@Body() body: UpdateShipmentDto): Promise<Shipment> {
    return this.shipmentService.updateShipment(body);
  }

  @Delete()
  @Roles(ERole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(JWTGuard)
  @HttpCode(200)
  deleteShipment(@Query('id') id: number) {
    return this.shipmentService.deleteShipment(id);
  }
}
