import { Body, Controller, Get, Param, Post, Put, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { PaymenService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { Request } from 'express';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('payment')
export class PaymenController {
  constructor(private readonly paymenService: PaymenService) { }

  @Post('/purchase')
  @UseGuards(JwtGuard)
  async purchsePayment(@Body() payment: PaymentDto) {
    return await this.paymenService.payment(payment)

  }

  @Get('/my/payment/history')
  @UseGuards(JwtGuard)
  async PaymentHistory(@Req() req: Request) {
    const id = req['user'].id
    return await this.paymenService.getMyPaymentHIstory(id)
  }

  @Get('/get/payment/history')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['superadmin', 'admin'])
  async getAllPaymentHistory() {
    return await this.paymenService.getAllPaymentHistory()
  }

  @Put('/update/payment/status/:id')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['superadmin', 'admin'])
  async updatePaymentStatus(@Param('id') id: string) {
    return await this.paymenService.updatePaymentStatus(id)

  }
}
