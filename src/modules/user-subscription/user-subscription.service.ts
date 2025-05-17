import { Injectable } from '@nestjs/common';
import { subscriptionDto } from './dto/subcription.dto';
import { DbService } from 'src/core/database/db.service';

@Injectable()
export class UserSubscriptionService {
    constructor(private prisma: DbService) { }

    async create(subscibtion: any) {
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + 30)
        subscibtion.endDate = endDate
        return await this.prisma.userSubscription.create({
            data: subscibtion, select: {
                id: true,
                payments: true,
                status: true,
                autoRenew: true,
                endDate: true,
                plan: {
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                },
                user: {
                    select: {
                        fullName: true,
                        role: true
                    }
                }
            }
        })
    }
}
