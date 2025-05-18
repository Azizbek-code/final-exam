import { Body, Controller, Delete, Get, Param, Post, Req, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MovieFilesService } from './movie-files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileMovie } from './dto/file.dto';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('movie-files')
export class MovieFilesController {
  constructor(private readonly movieFilesService: MovieFilesService) { }

  @Post('/:id')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['admin', 'superadmin'])
  @UseInterceptors(FileInterceptor('posterUrl'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: FileMovie, @Param('id') id: string) {
    return await this.movieFilesService.file(file.filename, body, id)
  }

  @Get('/:id')
  async getAllFile(@Param('id') id : string) {
    return await this.movieFilesService.getFile(id)
  }

  @Delete('/admin/:id')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['admin', 'superadmi'])
  async deleteOne(@Param('id') id: string) {
    return await this.movieFilesService.deleteOne(id)
  }
}