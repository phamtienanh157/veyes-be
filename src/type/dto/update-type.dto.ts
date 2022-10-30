import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTypeDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
