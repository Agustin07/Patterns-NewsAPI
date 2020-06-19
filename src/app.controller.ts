import { Controller, Post, UseGuards } from '@nestjs/common';
import AppService from './app.service';
import { UserDto, LoginUserDto } from './users/dto/user.dto';
import { User } from './users/user.decorator';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserDto) {
    return this.authService.login(user);
  }
}

export default AppController;
