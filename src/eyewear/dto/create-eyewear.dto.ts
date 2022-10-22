import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import ColorCollection from '../entity/colorCollection.entity';
import ImageCollection from '../entity/imageCollection.entity';

export class CreateEyewearDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  maxQuantity: number;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsNumber()
  brandId: number;

  @IsNotEmpty()
  @IsNumber()
  typeId: number;

  @IsNotEmpty()
  @IsArray()
  colorCollection: ColorCollection[];

  @IsNotEmpty()
  @IsArray()
  imageCollection: ImageCollection[];
}
