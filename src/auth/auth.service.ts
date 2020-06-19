import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import UsersService from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user)
      throw new HttpException(
        `User with email: '${email}' does not exist`,
        HttpStatus.UNAUTHORIZED,
      );
    if (user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { email: user.email, username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
