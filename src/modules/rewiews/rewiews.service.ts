import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/core/database/db.service';
import { RewiewDto } from './dto/create.rewiew.dto';

@Injectable()
export class RewiewsService {
    constructor(private prisma: DbService) { }

    async writeRewiews(id: string, user_id: string, body: RewiewDto) {
        const movie = await this.prisma.movie.findUnique({ where: { id } })
        if (!movie) {
            return new BadRequestException('notogri film')
        }
        const create = await this.prisma.review.create({
            data: {
                movieId: id,
                userId: user_id,
                comment: body.comment,
                rating: body.rating
            }, include: {
                movie: true
            }
        })
        const totalRating = await this.prisma.review.aggregate({
            where: { movieId: id },
            _avg: {
                rating: true,
            },

        });
        const sum = totalRating._avg.rating
        const ratingMovie = await this.prisma.movie.update({
            where: { id }, data: {
                rating: sum
            }
        })

        return create
    }

    async getAll(id: string) {
        return await this.prisma.review.findFirst({
            where: {
                movieId: id
            }
        })
    }

}
