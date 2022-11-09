import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { ERole } from 'src/common/constants';
import { AccountService } from './account.service';
import { SaveUserInfoDto } from './dto/save-user-info.dto';

@UseGuards(RoleGuard)
@UseGuards(JWTGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly userService: AccountService) {}

  @Get()
  // @Roles(ERole.USER)
  @HttpCode(200)
  async getUser(@Request() request) {
    return this.userService.getByUserId(request.user.id);
  }

  @Post()
  @Roles(ERole.USER)
  @HttpCode(200)
  async saveUserInfo(@Body() body: SaveUserInfoDto) {
    return this.userService.saveUserInfo(body);
  }
}
