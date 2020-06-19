import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UserDto } from './dto/user.dto';

@Injectable()
class UsersService {
  constructor(
    @InjectRepository(User)
    private repoUsers: Repository<User>,
  ) {}

  getUsers() {
    return this.repoUsers.find();
  }

  async createUser(data: CreateUserDto) {
    let user = new User();
    let userExists = await this.findOneByEmail(data.email);
    if (userExists)
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'User with ${data.email} already exists!',
        },
        HttpStatus.CONFLICT,
      );
    user.email = data.email;
    user.username = data.username;
    user.password = data.password;
    return await this.repoUsers.save(user);
  }

  async findOneByEmail(email: string) {
    return await this.repoUsers.findOne({ where: { email: email } });
  }
}

export default UsersService;
