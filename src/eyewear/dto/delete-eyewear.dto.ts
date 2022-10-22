import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteEyewearDto {
  @IsNotEmpty()
  @IsNumber()
  id: string;
}
