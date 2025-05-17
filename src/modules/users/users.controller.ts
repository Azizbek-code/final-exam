import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['superadmin', 'admin'])
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['superadmin', 'admin'])
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('update/avatar/:id')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['admin', 'superadmin'])
  @UseInterceptors(FileInterceptor('avatarUrl'))
  update(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, file.filename);
  }

  @Get('/get/me/profile')
  @UseGuards(JwtGuard)
  async getMe(@Req() req: Request) {
    const id = req['user'].id
    return await this.usersService.getMe(id)
  }

}
