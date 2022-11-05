import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { IAccessToken, ISignUpRes } from './auth.interface';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('/signup')
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<ISignUpRes> {
    try {
      await this.authService.signUp(authCredentialsDto);
      return {
        message: 'Sign up successfully!',
      };
    } catch (error) {
      throw new BadRequestException('Fail!');
    }
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<IAccessToken> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/change-password')
  @HttpCode(200)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}
