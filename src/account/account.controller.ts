import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { StatusGuard } from 'src/auth/guards/status.guard';
import { ERole } from 'src/common/constants';
import { AccountService } from './account.service';
import { SaveUserInfoDto } from './dto/save-user-info.dto';

@UseGuards(StatusGuard)
@UseGuards(RoleGuard)
@UseGuards(JWTGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @Roles(ERole.USER, ERole.ADMIN)
  @HttpCode(200)
  async getUser(@Request() request) {
    return this.accountService.getByUserId(request.user.id);
  }

  @Post()
  @Roles(ERole.USER)
  @HttpCode(200)
  async saveUserInfo(@Body() body: SaveUserInfoDto) {
    return this.accountService.saveUserInfo(body);
  }

  @Get('all')
  @Roles(ERole.ADMIN)
  @HttpCode(200)
  async getAll(
    @Query('page') page: number,
    @Query('keyword') keyword: string,
    @Query('limit') limit: number,
  ) {
    return this.accountService.getAll(keyword, page, limit);
  }

  @Post('change-status/:id')
  @Roles(ERole.ADMIN)
  @HttpCode(200)
  async changeStatus(@Param('id') id: number) {
    return this.accountService.changeStatus(id);
  }
}
