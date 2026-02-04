import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      type: 'sanity.function.document',
      src: './functions/change-settings',
      memory: 1,
      name: 'change-settings',
      event: {
        on: ['create', 'update'],
      },
    }),
  ],
})
