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
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JWTGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { RoleGuard } from './guards/roles.guard';
import { StatusGuard } from './guards/status.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('/signup')
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<ISignUpRes> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async signIn(@Request() request): Promise<IAccessToken> {
    return this.authService.signIn(request.user);
  }

  @Post('/change-password')
  @UseGuards(StatusGuard)
  @UseGuards(RoleGuard)
  @UseGuards(JWTGuard)
  @Roles(ERole.USER)
  @HttpCode(200)
  async changePassword(
    @Request() request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(request.user.id, changePasswordDto);
  }

  @Post('/reset-password')
  @HttpCode(200)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
