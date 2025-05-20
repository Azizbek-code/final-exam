import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [MailerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      transport: {
        host: config.get("SMTP_HOST"),
        port: +config.get("SMTP_PORT"),
        secure: true,
        auth: {
          user: config.get("EMAIL_USERNAME"),
          pass: config.get("EMAIL_PASSWORD")
        }
      },
      defaults: {
        from: config.get("EMAIL_USERNAME")
      }
    })
  })],
  controllers: [],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
