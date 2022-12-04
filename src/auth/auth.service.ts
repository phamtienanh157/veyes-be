import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ERole, EStatus } from 'src/common/constants';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { IJWTPayload, ISignInRes, ISignUpRes } from './auth.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Customer } from './entity/customer.entity';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private jwtService: JwtService,
    private mailService: MailService,
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

  async checkStatusActive(id: number): Promise<boolean> {
    console.log(id);
    const user = await this.usersRepository.findOneBy({ id });

    return user.status === EStatus.ACTIVE;
  }

  async authentication(username: string, password: string) {
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
    const { username, password, email } = authCredentialsDto;

    const userExist = await this.usersRepository.findOneBy({ username });
    const emailExist = await this.usersRepository.findOneBy({ email });

    if (userExist || emailExist) {
      throw new BadRequestException('Tài khoản đã tồn tại!');
    }
    try {
      const hashedPassword = await this.hashPassword(password);
      const user = await this.usersRepository.save({
        username,
        password: hashedPassword,
        email,
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

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email } = resetPasswordDto;
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('Email không tồn tại!');
    }
    try {
      const randomPass = Math.random().toString(36).slice(-8);
      await this.mailService.resetPassword(email, randomPass);

      const hashedPassword = await this.hashPassword(randomPass);

      user.password = hashedPassword;
      await this.usersRepository.save(user);

      return {
        message: 'Success',
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
