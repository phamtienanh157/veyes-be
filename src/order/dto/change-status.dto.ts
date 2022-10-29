import { IsNotEmpty, IsNumber } from 'class-validator';

export class ChangeStatusDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsNotEmpty()
  @IsNumber()
  status: number;
}
