import { Body, Controller, Get, Param, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { PlanService } from './plan.service';
import { updatePlan } from './dto/updatePlans.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { PlanDto } from './dto/create.dto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) { }

  @Get('/plans')
  @UseGuards(JwtGuard)
  async getAllPlans() {
    return await this.planService.getAll()
  }

  @Post('/plans/new')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['admin', 'superadmin'])
  async addNewPlans(@Body() createPlanDto: PlanDto) {
    return await this.planService.createPlan(createPlanDto)
  }

  @Put('plans/:id') 
  @UseGuards(JwtGuard)
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin', 'superadmin'])
  async updatePlan(@Body() updatePlan: updatePlan, @Param('id') id: string) {
    return await this.planService.updatePlan(updatePlan,id)
  }

  @Get('/:id')
  async getOnePlan(@Param('id') id: string) {
    return await this.planService.getOne( id)
  }

}
