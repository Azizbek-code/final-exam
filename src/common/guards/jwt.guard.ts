import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { access_token } = request.cookies
    const data = await this.jwtService.verifyAsync(access_token);
    if (!data) throw new UnauthorizedException('token is invlid')
    request.user = data;
    return true;
  }
}
