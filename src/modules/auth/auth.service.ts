import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { DbService } from 'src/core/database/db.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly prisma: DbService, private jwt: JwtService
    ) { }

    async register(registerDto: any) {
        const findUser = await this.prisma.user.findUnique({
            where: {
                username: registerDto.username
            }
        })
        if (findUser) throw new ConflictException('username already excepts')
        const hashedPassword = await bcrypt.hash(registerDto.password_hash, 12)
        registerDto.password_hash = hashedPassword
        const { password_hash, ...result } = await this.prisma.user.create({ data: registerDto })
        const access_token = this.jwt.sign(result)
        return {
            access_token,
            result
         }
    }

    async login(loginDto: LoginDto) {
        const findUser = await this.prisma.user.findUnique({ where: { username: loginDto.username } })
        if (!findUser) throw new UnauthorizedException('password or username incorecct')
        const comparePasword = await bcrypt.compare(loginDto.password_hash, findUser.password_hash)
        if (!comparePasword) throw new UnauthorizedException('password or username incorecct')
        const { password_hash, ...result } = findUser
        const access_token = this.jwt.sign(result)
        return {access_token,result}
    }
}
