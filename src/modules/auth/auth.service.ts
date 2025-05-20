import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { DbService } from 'src/core/database/db.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt'
import { ForgotPassword } from './dto/forgot.password.dt';

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
        return { access_token, result }
    }

    async token(data: ForgotPassword) {
        const findUser = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        if (!findUser) return new BadRequestException("email is not found")
        const { password_hash, email, id } = findUser
        const token = this.jwt.sign({ email: email, id: id })
        return token
    }

    async updatePassword(body: any, token: string) {
        const payload = this.jwt.verify(token)
        const findUser = await this.prisma.user.findUnique({
            where: {
                id: payload.id
            }
        })
        if (!findUser) return new UnauthorizedException("User Topilmadi")
        const password_hash = await bcrypt.hash(body.password_hash, 12)
        const updatedPassword = await this.prisma.user.update({
            where: {
                id: findUser.id
            },
            data: {
                password_hash
            }
        })
        return {
            updatedPassword: updatedPassword
        }
    }
}
