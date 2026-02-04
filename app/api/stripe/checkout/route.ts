import {stripe} from '@/lib/stripe'
import {auth} from '@clerk/nextjs/server'
import {headers} from 'next/headers'
import {NextResponse} from 'next/server'

export async function POST(req: Request) {
  try {
    const headerList = await headers()
    const origin = headerList.get('origin')

    const formData = await req.formData()
    const lookup_key = formData.get('lookup_key') as string
    const customer_id = formData.get('customer_id') as string

    const prices = await stripe.prices.list({
      lookup_keys: [lookup_key],
      expand: ['data.product'],
    })

    console.log('Price retrieved:', prices.data[0])

    const {userId, isAuthenticated} = await auth()

    if (!isAuthenticated || !userId) {
      return NextResponse.json({error: 'User not authenticated'}, {status: 401})
    }

    console.log('Creating checkout session for user:', userId)

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      customer: customer_id,
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      payment_method_types: ['card'],
      success_url: `${origin}/subscription/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      metadata: {clerkUserId: userId},
    })

    return NextResponse.redirect(session.url!, 303)
  } catch (error) {
    return Response.json(
      {
        error: 'Error creating checkout session',
        message: (error as Error).message,
      },
      {status: 500},
    )
  }
}
