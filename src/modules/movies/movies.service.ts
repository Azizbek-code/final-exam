import { Injectable } from '@nestjs/common';
import { DbService } from 'src/core/database/db.service';

@Injectable()
export class MoviesService {
    constructor(private prisma: DbService) { }

    async addNewMOvie(data: any) {
        const create = await this.prisma.movie.create({ data })
        //@ts-ignore
        const findMovie = await this.prisma.movie.findUnique({ where: { id: create.id } })
        return {
            findMovie
        }
    }

    async getAll(page: string, limit: string,category:any,search:any, subscriptionType: any) {
        return await this.prisma.movie.findMany({
            skip: +page,
            take: +limit,
            where: {
                subscriptionType: subscriptionType,
            },
            select: {
                movieFiles: true,
                reviews: true
            }
        })
    }

    async getOne(id: string) {
        const updatedMovie = await this.prisma.movie.update({
            where: { id },
            data: {
                viewCount: { increment: 1 },
            },
            select: {
                movieFiles: true,
                reviews: true,
                rating: true,
                movieCategories: {
                    include: {
                        movie: true,
                        category: true,
                    },
                },
            },
        });
        return updatedMovie;
    }

    async deleteOne(id: string) {
        return await this.prisma.movie.delete({
            where: {
                id
            }
        })
    }
}
