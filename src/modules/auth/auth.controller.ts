import { Body, Controller, Post, Query, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { ForgotPassword } from './dto/forgot.password.dt';
import { MailService } from '../mail/mail.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private emailService: MailService) { }
  @Post('/register')
  async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const { access_token, result } = await this.authService.register(registerDto)
    res.cookie('access_token', access_token, { httpOnly: true })
    return {
      message: 'succes',
      result

    };
  }

  @Post('/register/admin')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['superadmin'])
  async registerAdmin(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    registerDto['role'] = 'admin'
    const { access_token, result } = await this.authService.register(registerDto)
    res.cookie('access_token', access_token, { httpOnly: true })
    return {
      message: 'succes',
      result
    };
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { access_token, result } = await this.authService.login(loginDto)
    res.cookie('access_token', access_token, { httpOnly: true })
    return {
      message: 'succes',
      result
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

  @Post('/forgot-password')
  async ForgotPassword(@Body() body: ForgotPassword) {
    const token = await this.authService.token(body)
    const url = `http://localhost:3000/api/auth/update-password/?token=${token}`
    await this.emailService.sendEmail(body.email, url)
    return {
      "message": "xabar jonatildi"
    }
  }

  @Post('/update-password')
  async UpdatePassword(@Query("token") token: string, @Body() body: string) {
    return await this.authService.updatePassword(body, token)
  }
}
