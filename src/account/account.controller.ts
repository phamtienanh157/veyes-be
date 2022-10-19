import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { SaveUserInfoDto } from './dto/save-user-info.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly userService: AccountService) {}

  @Get()
  @HttpCode(200)
  async getByUserId(@Query('userId') id: number) {
    return this.userService.getByUserId(id);
  }

  @Post()
  @HttpCode(200)
  async saveUserInfo(@Body() body: SaveUserInfoDto) {
    return this.userService.saveUserInfo(body);
  }
}
