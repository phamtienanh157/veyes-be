import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Customer } from 'src/auth/entity/customer.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  paymentId: number;

  @IsNotEmpty()
  @IsNumber()
  shipmentId: number;

  @IsNotEmpty()
  @IsNumber()
  customer: Customer;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartDto)
  cart: CartDto[];

  @IsNumber()
  note: string | null;

  @IsNumber()
  isPaid: number;
}

class CartDto {
  @IsNotEmpty()
  @IsNumber()
  eyewearId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  colorCode: string;
}
