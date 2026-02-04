import {v} from 'convex/values'
import {internalQuery, mutation, query} from './_generated/server'

const LIMITS_ID = 'global_limits'

export const getLimits = query({
  handler: async (ctx) => {
    return await ctx.db
      .query('settings')
      .withIndex('by_key', (q) => q.eq('key', LIMITS_ID))
      .unique()
  },
})

export const updateLimits = mutation({
  args: {
    maxTasks: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('settings')
      .withIndex('by_key', (q) => q.eq('key', LIMITS_ID))
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, {
        maxTasks: args.maxTasks,
      })
    } else {
      await ctx.db.insert('settings', {
        key: LIMITS_ID,
        maxTasks: args.maxTasks,
      })
    }
  },
})

export const getLimitInternal = internalQuery({
  handler: async (ctx) => {
    return (
      await ctx.db
        .query('settings')
        .withIndex('by_key', (q) => q.eq('key', LIMITS_ID))
        .unique()
    )?.maxTasks
  },
})
