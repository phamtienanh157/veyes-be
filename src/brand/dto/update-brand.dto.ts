import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBrandDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
