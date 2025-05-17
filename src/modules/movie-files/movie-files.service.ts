import { Injectable } from '@nestjs/common';
import { DbService } from 'src/core/database/db.service';
import { FileMovie } from './dto/file.dto';

@Injectable()
export class MovieFilesService {
    constructor(private prisma: DbService) {

    }

    async file(name: string, data: FileMovie, id: string) {
        return await this.prisma.movieFile.create({
            data: {
                fileUrl: name,
                movieId: id,
                language: data.language,
                //@ts-ignore
                quality: data.quality,
                

            }
        })
    }
}
