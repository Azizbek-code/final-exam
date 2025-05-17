import { Injectable } from '@nestjs/common';
import { DbService } from 'src/core/database/db.service';

@Injectable()
export class MovieCategoryService {
    constructor(private prisma: DbService) { }

    async create(body: any) {
        return await this.prisma.movieCategory.create({ data: body, include: { movie: true, category: true } })
    }
}
