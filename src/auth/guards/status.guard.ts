import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class StatusGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const isActive = await this.authService.checkStatusActive(user.id);
    if (!isActive) {
      throw new HttpException(
        'Tài khoản đã bị khóa',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return true;
  }
}
