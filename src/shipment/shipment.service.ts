import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipment } from 'src/order/entity/shipment.entity';
import { Repository } from 'typeorm';
import { UpdateShipmentDto } from './dto/update-shipment.dto';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
  ) {}

  async getListShipment() {
    return await this.shipmentRepository.find();
  }

  async updateShipment(body: UpdateShipmentDto) {
    const shipment = new Shipment();
    if (body.id) {
      shipment.id = body.id;
    }
    shipment.methodName = body.methodName;
    shipment.price = body.price;
    return await this.shipmentRepository.save(shipment);
  }

  async deleteShipment(id: number) {
    return await this.shipmentRepository.delete({ id });
  }
}
