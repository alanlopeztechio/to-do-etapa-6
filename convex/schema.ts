import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    userId: v.id('users'),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    role: v.union(
      v.literal('admin'),
      v.literal('normal'),
      v.literal('premium'),
    ),
    stripeCustomerId: v.optional(v.string()),
    subscriptionStatus: v.optional(v.string()),
    endsAt: v.optional(v.number()),
  })
    .index('clerkId', ['clerkId'])
    .index('stripeCustomerId', ['stripeCustomerId']),
});
