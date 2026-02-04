import {ConvexError, v} from 'convex/values'
import {internal} from './_generated/api'
import {mutation, query, QueryCtx} from './_generated/server'
import {userByClerkId} from './users'

export const getTaskList = query({
  handler: async (ctx) => {
    const user = await identifyUser(ctx)
    return await getAllTasks(ctx, user._id)
  },
})

export const getAllTasks = async (ctx: QueryCtx, id: string) => {
  return await ctx.db
    .query('todos')
    .filter((q) => q.eq(q.field('userId'), id))
    .collect()
}

export const addTask = mutation({
  args: {text: v.string()},
  handler: async (ctx, args) => {
    const user = await identifyUser(ctx)

    const tasks = await getAllTasks(ctx, user._id)

    const limit = await ctx.runQuery(internal.limit.getLimitInternal)

    if (limit == null) {
      throw new ConvexError({
        message: 'Límite de tareas no configurado. Contacta al administrador.',
      })
    }

    if (user.role == 'normal' && tasks.length >= limit) {
      throw new ConvexError({
        message: 'Límite de tareas alcanzado. Actualiza a Premium para más.',
      })
    }

    ctx.db.insert('todos', {
      text: args.text,
      isCompleted: false,
      userId: user?._id!,
    })
  },
})

export const updateTask = mutation({
  args: {id: v.id('todos'), isCompleted: v.boolean()},
  handler: async (ctx, args) => {
    isAuthenticated(ctx)
    await ctx.db.patch(args.id, {isCompleted: args.isCompleted})
    return args.id
  },
})

export const deleteTask = mutation({
  args: {id: v.id('todos')},
  handler: async (ctx, args) => {
    isAuthenticated(ctx)
    await ctx.db.delete('todos', args.id)
    return args.id
  },
})

const isAuthenticated = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity()
  if (identity === null) {
    throw new ConvexError('Not authenticated')
  }
  return identity
}

const identifyUser = async (ctx: QueryCtx) => {
  const identity = await isAuthenticated(ctx)
  const user = await userByClerkId(ctx, identity.subject)
  if (!user)
    throw new ConvexError({
      message: 'User not found',
    })
  return user
}
