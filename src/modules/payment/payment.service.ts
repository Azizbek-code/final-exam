import { Injectable } from '@nestjs/common';
import { DbService } from 'src/core/database/db.service';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymenService {
    constructor(private prisma: DbService) { }

    async payment(payment: PaymentDto) {
        //@ts-ignore
        const create = await this.prisma.payment.create({ data: payment })
        const subscription = await this.prisma.userSubscription.findUnique({
            where: { id: payment.userSubscriptionId },
            select: {
                id: true,
                startDate: true,
                endDate: true,
                status: true,
                autoRenew: true,
                plan: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
        const plan = await this.prisma.userSubscription.findUnique({
            where: { id: payment.userSubscriptionId },
            include: {
                payments: {
                    select: {
                        paymentMethod: true,
                        paymentDetails: true
                    }
                }
            }
        })
        return {
            ...subscription,
            ...plan
        }
    }

    async getMyPaymentHIstory(id: string) {
        const findUserSubscribtion = await this.prisma.userSubscription.findMany({
            where: {
                userId: id
            },
            select: {
                id: true
            }
        })
        const findPayment = await this.prisma.payment.findMany({
            where: {
                userSubscriptionId: findUserSubscribtion['id']
            }
        })
        return {
            ...findPayment
        }
    }

    async getAllPaymentHistory() {
        return await this.prisma.payment.findMany()
    }

    async updatePaymentStatus(id: string) {
        const payment = await this.prisma.payment.findUnique({ where: { id } })
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + 30)
        const start_date = new Date().toISOString()
        const updateDate = await this.prisma.userSubscription.update({
            where: {
                id: payment?.userSubscriptionId
            },
            data: {
                startDate: start_date,
                endDate: endDate
            }
        })
        return updateDate
    }
}
