import { Body, Controller, Delete, Get, Param, Post, Query, Req, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { Request } from 'express';
import { CreateMovieDto } from './dto/moviess.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Post('/')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['admin', 'superadmin'])
  @UseInterceptors(FileInterceptor('posterUrl'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: CreateMovieDto, @Req() req: Request) {
    //@ts-ignore
    body.posterUrl = file.filename
    //@ts-ignore
    body.createdById = req.user.id
    return await this.moviesService.addNewMOvie(body);
  }

  @Get('/')
  async getAllfilms(@Query('page') page: string,
    @Query('limit') limit: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('subscription_type') subscriptionType?: string,) {
    return await this.moviesService.getAll(page,limit,category,search,subscriptionType)
  }

  @Get('/:id')
  async GetOne(@Param('id') id: string) {
    return await this.moviesService.getOne(id)
  }

  @Delete('admin/:id')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['admin', 'superadmin'])
  async deleteOne(@Param('id') id: string) {
    return await this.moviesService.deleteOne(id)
  }
}
