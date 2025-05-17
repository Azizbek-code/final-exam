import { Injectable } from '@nestjs/common';
import { DbService } from 'src/core/database/db.service';

@Injectable()
export class UsersService {

  constructor(private prisma: DbService) { }
  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id: id }
    });
  }

  async update(id: string, data: any) {
    return await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        avatarUrl: data
      }
    });
  }


  async getMe(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }
}
