import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

const envs = {
  NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL || '',
}

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      type: 'sanity.function.document',
      src: './functions/change-settings',
      displayName: 'Change Settings Logger',
      memory: 1,
      name: 'change-settings',
      event: {
        on: ['create', 'update'],
        filter: '_type == "settings"',
        projection: '{ limit }',
      },
      env: envs,
    }),
  ],
})
