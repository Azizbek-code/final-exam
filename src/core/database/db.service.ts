import { Logger, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

export class DbService extends PrismaClient implements OnModuleInit {
    private logger = new Logger('Prisma service')
    onModuleInit() {
        try {
            this.$connect()
            this.logger.log('database connected')
        } catch (error) {
            this.$disconnect()
            this.logger.error('server is broken')
        }
    }
}