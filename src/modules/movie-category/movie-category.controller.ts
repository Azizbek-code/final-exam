import { Body, Controller, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { MovieCategoryService } from './movie-category.service';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('movie-category')
export class MovieCategoryController {
  constructor(private readonly movieCategoryService: MovieCategoryService) { }

  @Post('/create')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles',['admin','superadmin'])
  async createMovieCotegory(@Body() body: any) {
    return await this.movieCategoryService.create(body)
  }
}
