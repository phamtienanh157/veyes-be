import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCommentDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
