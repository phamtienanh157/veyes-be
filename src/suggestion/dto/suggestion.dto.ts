import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SuggestionDto {
  @IsNotEmpty()
  @IsString()
  gender: number;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsNumber()
  faceForm: number;

  @IsNotEmpty()
  @IsNumber()
  material: number[];

  @IsNotEmpty()
  @IsNumber()
  glassForm: number[];
}
