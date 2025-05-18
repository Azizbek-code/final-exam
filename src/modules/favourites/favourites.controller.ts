import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { Request } from 'express';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) { }

  @Get('/add/favaurites/:id')
  @UseGuards(JwtGuard)
  async addFavaurites(@Param('id') id: string, @Req() req: Request) {
    const user = req['user'].id
    return await this.favouritesService.addFavaurites(id, user)
  }

  @Get()
  async getFavaurites() {
    return await this.favouritesService
  }

  @Delete('/delete/:id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string, @Req() req: Request) {
    return await this.favouritesService.remove(id,req['user'].id)
  }
}
