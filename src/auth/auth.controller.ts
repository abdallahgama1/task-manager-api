import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.register(registerUserDto);
    res.cookie('access_token', token.access_token, {
      httpOnly: true, // prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // use secure cookies in production
      maxAge: 3600 * 1000, // cookie expiration time in milliseconds (1 hour here)
    });

    return { message: 'Logged in successfully' };
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(loginUserDto);
    res.cookie('access_token', token.access_token, {
      httpOnly: true, // prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // use secure cookies in production
      maxAge: 3600 * 1000, // cookie expiration time in milliseconds (1 hour here)
    });

    return { message: 'Logged in successfully' };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }
}
