import { Module } from '@nestjs/common';
import { MovieFilesService } from './movie-files.service';
import { MovieFilesController } from './movie-files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  })],
  controllers: [MovieFilesController],
  providers: [MovieFilesService],
})
export class MovieFilesModule { }
