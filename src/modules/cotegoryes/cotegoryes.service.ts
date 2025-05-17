import { Injectable } from '@nestjs/common';
import { CreateCotegoryeDto } from './dto/create-cotegorye.dto';
import { UpdateCotegoryeDto } from './dto/update-cotegorye.dto';
import { DbService } from 'src/core/database/db.service';

@Injectable()
export class CotegoryesService {
  constructor(private prisma: DbService) { }

  async create(createCotegoryeDto: CreateCotegoryeDto) {
    //@ts-ignore
    return this.prisma.category.create({ data: createCotegoryeDto })
  }

  async findAll() {
    return this.prisma.category.findMany()
  }

  async findOne(id: any) {
    const movies = await this.prisma.movie.findMany({ where: { id: id }, select: { description: true, rating: true } })
    const categoryes = await this.prisma.category.findUnique({ where: { id }, select: { name: true, description: true } })
    return {
      ...categoryes,
      ...movies
    }
  }

  async update(id: string, updateCotegoryeDto: UpdateCotegoryeDto) {
    return await this.prisma.category.update({ where: { id }, data: updateCotegoryeDto })
  }

  async remove(id: string) {
    return await this.prisma.category.delete({ where: { id } })
  }
}
