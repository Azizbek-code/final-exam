import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { subscriptionDto } from './dto/subcription.dto';

@Controller('user-subscription')
export class UserSubscriptionController {
  constructor(private readonly userSubscriptionService: UserSubscriptionService) { }
  
  @Post('/purchase')
  async create(@Body() subscribtion: subscriptionDto) {
    return await this.userSubscriptionService.create(subscribtion)
  }
}
