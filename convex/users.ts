import {ConvexError, v} from 'convex/values'
import {mutation, query, QueryCtx} from './_generated/server'

export const getUserByClerkId = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Not authenticated')
    }

    return await userByClerkId(ctx, identity.subject)
  },
})

export const createUserWithClerkIdAndStripeCustomerId = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    role: v.union(v.literal('admin'), v.literal('normal'), v.literal('premium')),
    stripeCustomerId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert('users', {
      name: args.name,
      email: args.email,
      clerkId: args.clerkId,
      role: args.role,
      stripeCustomerId: args.stripeCustomerId,
    })
    return userId
  },
})

export const deleteUserByClerkId = mutation({
  args: {clerkId: v.string()},
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('clerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique()

    if (!user) {
      throw new Error('User not found')
    }

    return await ctx.db.delete('users', user._id)
  },
})

export const updateUserRole = mutation({
  args: {
    role: v.union(v.literal('admin'), v.literal('normal'), v.literal('premium')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Not authenticated')
    }

    const user = await userByClerkId(ctx, identity.subject)

    if (!user) {
      throw new Error('User not found')
    }

    await ctx.db.patch(user._id, {role: args.role})
    return user._id
  },
})

export const updateUserBilling = mutation({
  args: {
    stripeCustomerId: v.string(),
    subscriptionStatus: v.string(),
    endsAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('stripeCustomerId', (q) => q.eq('stripeCustomerId', args.stripeCustomerId))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    await ctx.db.patch(user._id, {
      subscriptionStatus: args.subscriptionStatus,
    })

    return user._id
  },
})

export async function userByClerkId(ctx: QueryCtx, clerkId: string) {
  return await ctx.db
    .query('users')
    .withIndex('clerkId', (q) => q.eq('clerkId', clerkId))
    .unique()
}
