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

    async remove(id:string,user:string) {
        return await this.prisma.favorite.delete({
            where: {
                id,
                userId:user
        }})
    }
}
