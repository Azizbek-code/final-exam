import { Body, Controller, Post, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('/register')
  async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const access_token = await this.authService.register(registerDto)
    res.cookie('access_token', access_token, { httpOnly: true })
    return {
      message: 'succes'
    };
  }

  @Post('/register/admin')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['superadmin'])
  async registerAdmin(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    registerDto['role'] = 'admin'
    const access_token = await this.authService.register(registerDto)
    res.cookie('access_token', access_token, { httpOnly: true })
    return {
      message: 'succes'
    };
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const access_token = await this.authService.login(loginDto)
    res.cookie('access_token', access_token, { httpOnly: true })
    return {
      message: 'succes'
    };
  }

  @Post('/logout')
  @UseGuards(JwtGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', { httpOnly: true })
    return {
      message: 'cookie muvafaqiyatli ochirildi'
    }
  }
}
