import { Logger, OnModuleInit } from "@nestjs/common"
import fs from 'fs'
import path from 'path'

export class SeederService implements OnModuleInit {
    private readonly logger = new Logger('Seeder avatar')
    constructor() { }
    async seedAll() {
        await this.seedAvatar()
    }
    async seedAvatar() {
        const folderPath = path.join('uploads', 'avatar');
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        this.logger.log('avatar papkasi yaratildi')
    }
    async onModuleInit() {
        try {
            await this.seedAll()
        } catch (error) {
            this.logger.error(error)
            process.exit(1)
        }
    }
}