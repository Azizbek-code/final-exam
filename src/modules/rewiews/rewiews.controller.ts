import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { RewiewsService } from './rewiews.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { Request } from 'express';
import { RewiewDto } from './dto/create.rewiew.dto';

@Controller('rewiews')
export class RewiewsController {
  constructor(private readonly rewiewsService: RewiewsService) { }

  @Post('/write/:id')
  @UseGuards(JwtGuard)
  async writeRewiews(@Param('id') id: string, @Body() body: RewiewDto, @Req() req: Request) {
    return await this.rewiewsService.writeRewiews(id, req['user'].id, body)
  }

  @Get('/getAll/:id')
  async getAll(@Param('id') id: string) {
    return await this.rewiewsService.getAll(id)
  }
}
