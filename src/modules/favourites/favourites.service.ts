import { Injectable } from '@nestjs/common';
import { DbService } from 'src/core/database/db.service';

@Injectable()
export class FavouritesService {
    constructor(private prisma: DbService) { }

    async addFavaurites(id: string, user: string) {
        return await this.prisma.favorite.create({
            data: {
                movieId: id,
                userId: user
            }
        })
    }

    async getAllFavaurites() {
        const favaurites = await this.prisma.favorite.findMany({})
        const count = await this.prisma.favorite.aggregate({
            _count: {
                _all: true
            }
        })
        return {
            favaurites,
            count
        }
    }

    async remove(id: string, user: string) {
        return await this.prisma.favorite.delete({
            where: {
                id,
                userId: user
            }
        })
    }
}
