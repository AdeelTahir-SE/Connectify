import { Module } from '@nestjs/common';
import { StripePaymentService } from './payment.service';
import { StripeController } from './payment.controller';

@Module({
  controllers: [StripeController],
  providers: [StripePaymentService],
})
export class PaymentModule {}
