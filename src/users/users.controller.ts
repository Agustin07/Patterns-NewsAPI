import {
  Controller,
  Get,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Inject,
  forwardRef,
} from '@nestjs/common';
import UsersService from './users.service';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return new UserDto(await this.usersService.createUser(user));
  }
}

export default UsersController;
