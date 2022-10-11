import {
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
import { IAccessToken } from './types/access-token.interface';
import { IJWTPayload } from './types/jwt-payload.interface';
import { User } from './entity/user.entity';
import { EErrorCode, ERole } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      const { username, password } = authCredentialsDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      await this.usersRepository.save({
        username,
        password: hashedPassword,
        role: ERole.USER,
      });
    } catch (error) {
      if (error.code === EErrorCode.ConflictException) {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<IAccessToken> {
    try {
      const { username, password } = authCredentialsDto;
      const user = await this.usersRepository.findOneBy({ username });
      if (user && (await bcrypt.compare(password, user.password))) {
        const payload: IJWTPayload = { username, role: user.role };
        const accessToken: string = await this.jwtService.sign(payload);
        return { accessToken };
      } else {
        throw new UnauthorizedException('Please check your login credentials!');
      }
    } catch (error) {
      throw new UnauthorizedException('Please check your login credentials!');
    }
  }
}
