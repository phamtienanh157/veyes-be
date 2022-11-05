import { IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  newPassword: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  confirmPassword: string;
}
