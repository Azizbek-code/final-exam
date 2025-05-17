import { Injectable } from '@nestjs/common';
import { DbService } from 'src/core/database/db.service';
import { updatePlan } from './dto/updatePlans.dto';

@Injectable()
export class PlanService {
    constructor(private prisma: DbService) { }

    async getAll() {
        return await this.prisma.subscriptionPlan.findMany()
    }

    async getOne(id: any) {
        return await this.prisma.subscriptionPlan.findUnique({
            where: { id: id }
        })
    }

    async createPlan(planDto: any) {
        return await this.prisma.subscriptionPlan.create({ data: planDto })
    }

    async updatePlan(updatePlan: any, id: any) {
        return await this.prisma.subscriptionPlan.update({
            where: {
                id: id
            },
            data: updatePlan
        })
    }
}
