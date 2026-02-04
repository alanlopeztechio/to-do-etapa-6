/* eslint-disable no-restricted-imports */
import {customCtx, customMutation} from 'convex-helpers/server/customFunctions'
import {Triggers} from 'convex-helpers/server/triggers'
import {DataModel} from './_generated/dataModel'
import {internalMutation as rawInternalMutation, mutation as rawMutation} from './_generated/server'

// Crear instancia de triggers con el DataModel generado
const triggers = new Triggers<DataModel>()

// Registrar trigger sobre la tabla "users"
triggers.register('users', async (ctx, change) => {
  console.log('User table changed:', change)

  if (change.operation === 'delete') {
    for await (const toDo of ctx.db
      .query('todos')
      .withIndex('by_user', (q) => q.eq('userId', change.id))) {
      await ctx.db.delete('todos', toDo._id)
    }
  }
})

// Exportar versiones envueltas de mutation/internalMutation
export const mutation = customMutation(rawMutation, customCtx(triggers.wrapDB))
export const internalMutation = customMutation(rawInternalMutation, customCtx(triggers.wrapDB))
