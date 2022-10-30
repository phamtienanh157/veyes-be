import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { Shipment } from 'src/order/entity/shipment.entity';
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
  @HttpCode(200)
  updateShipment(@Body() body: UpdateShipmentDto): Promise<Shipment> {
    return this.shipmentService.updateShipment(body);
  }

  @Delete()
  @HttpCode(200)
  deleteShipment(@Query('id') id: number) {
    return this.shipmentService.deleteShipment(id);
  }
}
