import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailService: MailerService) { }
    async sendEmail(email: string, message: string) {
        return await this.mailService.sendMail({
            to: email,
            subject: "Parol Tiklash",
            html: `<h1>${message}</h1>`,
        })
    }
}

