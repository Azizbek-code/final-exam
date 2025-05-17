import { Injectable } from '@nestjs/common';
import { DbService } from 'src/core/database/db.service';

@Injectable()
export class MoviesService {
    count = 0
    constructor(private prisma: DbService) { }

    async addNewMOvie(data: any) {
        const create = await this.prisma.movie.create({ data })
        //@ts-ignore
        const findMovie = await this.prisma.movie.findUnique({ where: { id: create.id } })
        return {
            findMovie
        }
    }

    async getAll(page: string, limit: string, subscriptionType: any) {
        return await this.prisma.movie.findMany({
            skip: +page,
            take: +limit,
            where: {
                subscriptionType: subscriptionType
            }
        })
    }

    async getOne(id: string) {
        const totalRating = await this.prisma.review.aggregate({
            where: { movieId: id }, 
            _avg: {
              rating: true,
            },
            
          });
        const sum = totalRating._avg.rating
        const updatedMovie = await this.prisma.movie.update({
            where: { id },
            data: {
                viewCount: { increment: 1 },
            },
            select: {
                movieFiles: true,
                reviews: true,
                rating:true,
                movieCategories: {
                    include: {
                        movie: true,
                        category: true,
                    },
                },
            },
        });
        //@ts-ignore
        updatedMovie['rating'] = sum
        return updatedMovie;
    }
}
