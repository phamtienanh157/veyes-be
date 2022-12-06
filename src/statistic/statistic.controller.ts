import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { ERole } from 'src/common/constants';
import { StatisticService } from './statistic.service';

@Roles(ERole.ADMIN)
@UseGuards(RoleGuard)
@UseGuards(JWTGuard)
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get()
  @HttpCode(200)
  getListShipment(@Query('year') year: number) {
    return this.statisticService.getStatistic(year);
  }
}
