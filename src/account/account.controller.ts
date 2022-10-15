import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { GetUserDto } from './dto/get-user.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly userService: AccountService) {}

  @Post()
  @HttpCode(200)
  async getListEyewear(@Body() body: GetUserDto) {
    return this.userService.getUser(body);
  }
}
