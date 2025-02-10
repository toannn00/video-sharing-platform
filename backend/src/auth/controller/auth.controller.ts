import { Controller, Body, Post } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userInfo: UserDto): Promise<{ token: string }> {
    return this.authService.signIn(userInfo);
  }
}
