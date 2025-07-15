import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class StripePaymentService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY') as string,
    );
  }

  async createCustomer(
    email: string,
    name: string,
  ): Promise<{ data: Stripe.Customer | null; error: string | null }> {
    try {
      const customer = await this.stripe.customers.create({ email, name });
      return { data: customer, error: null };
    } catch (error: any) {
      return { data: null, error: error?.message };
    }
  }

  async createSubscription(
    customerId: string,
    priceId: string,
  ): Promise<{ data: Stripe.Subscription | null; error: string | null }> {
    try {
      if (!customerId || !priceId) {
        return {
          data: null,
          error: 'Customer ID and Price ID are required',
        };
      }

      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',

        expand: ['latest_invoice.confirmation_secret'],
      });

      return { data: subscription, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }

  async getInvoiceById(invoiceId: string): Promise<Stripe.Invoice> {
    return await this.stripe.invoices.retrieve(invoiceId, {
      expand: ['payment_intent'],
    });
  }

  async getInvoice(invoiceId: string) {
    try {
      const invoice = await this.stripe.invoices.retrieve(invoiceId);

      return {
        hosted_invoice_url: invoice.hosted_invoice_url,
        invoice_pdf: invoice.invoice_pdf,
        amount_paid: invoice.amount_paid,
        status: invoice.status,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve invoice');
    }
  }
}
