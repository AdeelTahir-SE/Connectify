import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { StripePaymentService } from './payment.service';
import Stripe from 'stripe';

@Controller('payment')
export class StripeController {
  constructor(private readonly stripeService: StripePaymentService) {}

  @Post('create-subscription')
  async createSubscription(
    @Body()
    body: {
      email: string;
      name: string;
      priceId: string;
    },
  ) {
    const { email, name, priceId } = body;

    // 1. Create customer
    const customerResult = await this.stripeService.createCustomer(email, name);
    if (customerResult.error || !customerResult.data) {
      throw new BadRequestException(
        `Failed to create customer: ${customerResult.error}`,
      );
    }

    // 2. Create subscription
    const subscriptionResult = await this.stripeService.createSubscription(
      customerResult.data.id,
      priceId,
    );
    // Check if the subscription creation was successful

    if (
      subscriptionResult.error ||
      !subscriptionResult.data ||
      !subscriptionResult.data.latest_invoice
    ) {
      throw new BadRequestException(
        `Failed to create subscription: ${subscriptionResult.error}`,
      );
    }


    const invoice = subscriptionResult.data.latest_invoice as Stripe.Invoice 
    console.log('\n\n\n\n\n\ninvoice', invoice)
    const clientSecret = invoice?.confirmation_secret?.client_secret;

    return {
      subscriptionId: subscriptionResult.data.id,
      clientSecret: clientSecret,
      invoiceId: invoice.id,
    };
  }

  @Get('invoice/:invoiceId')
  async getInvoice(@Param('invoiceId') invoiceId: string) {
    return await this.stripeService.getInvoice(invoiceId);
  }
}
