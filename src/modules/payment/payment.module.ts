import { Module } from '@nestjs/common';
import { PaymenService } from './payment.service';
import { PaymenController } from './payment.controller';

@Module({
  controllers: [PaymenController],
  providers: [PaymenService],
})
export class PaymenModule { }
