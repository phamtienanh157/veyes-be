import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ERole } from 'src/common/constants';
import { IAccessToken, ISignUpRes } from './auth.interface';
import { AuthService } from './auth.service';
import { Roles } from './decorator/roles.decorator';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JWTGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { RoleGuard } from './guards/roles.guard';

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
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async signIn(@Request() request): Promise<IAccessToken> {
    return this.authService.signIn(request.user);
  }

  @Post('/change-password')
  @UseGuards(RoleGuard)
  @UseGuards(JWTGuard)
  @Roles(ERole.USER)
  @HttpCode(200)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}
