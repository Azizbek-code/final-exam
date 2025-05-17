import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { CotegoryesService } from './cotegoryes.service';
import { CreateCotegoryeDto } from './dto/create-cotegorye.dto';
import { UpdateCotegoryeDto } from './dto/update-cotegorye.dto';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('cotegoryes')
export class CotegoryesController {
  constructor(private readonly cotegoryesService: CotegoryesService) { }

  @Post()
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles',['admin','superadmin'])
  create(@Body() createCotegoryeDto: CreateCotegoryeDto) {
    return this.cotegoryesService.create(createCotegoryeDto);
  }

  @Get()
  findAll() {
    return this.cotegoryesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cotegoryesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles',['admin','superadmin'])
  update(@Param('id') id: string, @Body() updateCotegoryeDto: UpdateCotegoryeDto) {
    return this.cotegoryesService.update(id, updateCotegoryeDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles',['admin','superadmin'])
  remove(@Param('id') id: string) {
    return this.cotegoryesService.remove(id);
  }
}
