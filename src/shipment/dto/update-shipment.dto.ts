import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateShipmentDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  methodName: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
