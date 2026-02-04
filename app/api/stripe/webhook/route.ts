import { api } from '@/convex/_generated/api';

import { fetchMutation } from 'convex/nextjs';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import stripe from 'stripe';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get('stripe-signature');

  if (!sig) {
    return new NextResponse('Missing signature', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return new NextResponse('Webhook Error', { status: 400 });
  }

  switch (event.type) {
    case 'customer.subscription.created':
      const subscription = event.data.object as Stripe.Subscription;

      await fetchMutation(api.users.updateUserBilling, {
        stripeCustomerId: event.data.object.customer as string,
        subscriptionStatus: subscription.status,
        endsAt: subscription.ended_at || undefined,
      });
      break;
    case 'customer.subscription.updated':
      break;
    case 'customer.subscription.deleted':
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
