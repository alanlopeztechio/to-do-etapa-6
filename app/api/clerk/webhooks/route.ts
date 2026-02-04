import {api} from '@/convex/_generated/api'
import {stripe} from '@/lib/stripe'
import {clerkClient} from '@clerk/nextjs/server'
import {verifyWebhook} from '@clerk/nextjs/webhooks'
import {fetchMutation, fetchQuery} from 'convex/nextjs'
import {NextRequest} from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    const {id} = evt.data
    const eventType = evt.type

    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    if (evt.type === 'user.created') {
      console.log('userId:', evt.data.id)
      const client = await clerkClient()

      const res = await client.users.updateUser(evt.data.id, {
        publicMetadata: {role: 'normal'},
      })

        const userStripe = await stripe.customers.create({
          name: res.firstName || 'No name',
          email: res.emailAddresses[0]?.emailAddress || '',
          metadata: {clerkUserId: res.id},
        })

      const response = await fetchMutation(api.users.createUserWithClerkIdAndStripeCustomerId, {
        clerkId: res.id,
        email: res.emailAddresses[0]?.emailAddress || '',
        name: res.firstName || 'No Name',
        role: 'normal',
        stripeCustomerId: userStripe.id,
      })

      return new Response('Webhook received', {status: 200, statusText: JSON.stringify(response)})
    }
    if (evt.type === 'user.deleted') {
      console.log('Deleted userId:', evt.data.id)
      const response = await fetchMutation(api.users.deleteUserByClerkId, {
        clerkId: evt.data.id!,
      })
      return new Response('Webhook received', {status: 200, statusText: JSON.stringify(response)})
    }

    return new Response('Webhook received', {status: 200})
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', {status: 400})
  }
}
