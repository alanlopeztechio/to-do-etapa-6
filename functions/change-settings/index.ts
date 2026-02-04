import {api} from '@/convex/_generated/api'
import {documentEventHandler} from '@sanity/functions'
import {fetchMutation} from 'convex/nextjs'

export const handler = documentEventHandler(async ({context, event}) => {
  const time = new Date().toLocaleTimeString()
  console.log(`👋 Your Sanity Function was called at ${time}`)

  const doc = event.data

  const limit = doc?.limit

  console.log('Nuevo límite de settings:', limit)

  await fetchMutation(api.limit.updateLimits, {
    maxTasks: limit as number,
  })
})
