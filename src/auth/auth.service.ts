import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entity/user.entity';
import { EErrorCode, ERole } from 'src/common/constants';
import { IJWTPayload, ISignInRes, ISignUpRes } from './auth.interface';
import { Customer } from './entity/customer.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(
    password: string,
    storePasswordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, storePasswordHash);
  }

  async authentication(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }

    const check = await this.comparePassword(password, user.password);

    if (!check) {
      return false;
    }

    return user;
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<ISignUpRes> {
    const { username, password } = authCredentialsDto;

    try {
      const userExist = await this.usersRepository.findOneBy({ username });

      if (userExist) {
        throw new BadRequestException('Tài khoản đã tồn tại!');
      }

      const hashedPassword = await this.hashPassword(password);
      const user = await this.usersRepository.save({
        username,
        password: hashedPassword,
        role: ERole.USER,
      });
      await this.customerRepository.save({
        user,
      });
      return {
        message: 'Success',
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async signIn(userEntity: User): Promise<ISignInRes> {
    const { username, id, role } = userEntity;
    const payload: IJWTPayload = { username, role: role, userId: id };
    const accessToken: string = this.jwtService.sign(payload);
    return { accessToken, role };
  }

  async changePassword(id, changePasswordDto: ChangePasswordDto) {
    try {
      const { oldPassword, newPassword } = changePasswordDto;
      const user = await this.usersRepository.findOneBy({ id });

      const check = await bcrypt.compare(oldPassword, user.password);

      if (check && oldPassword !== newPassword) {
        const hashedPassword = await this.hashPassword(newPassword);
        user.password = hashedPassword;
        await this.usersRepository.save(user);
        return {
          message: 'Successfully',
        };
      } else {
        throw new BadRequestException();
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
