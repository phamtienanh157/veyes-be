import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCommentDto {
  @IsNumber()
  @IsNotEmpty()
  eyewearId: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
