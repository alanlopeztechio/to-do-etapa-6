'use client'

/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */
import {apiVersion, dataset, projectId, studioUrl} from '@/sanity/lib/api'
import * as resolve from '@/sanity/plugins/resolve'
import {pageStructure, singletonPlugin} from '@/sanity/plugins/settings'
import page from '@/sanity/schemas/documents/page'
import project from '@/sanity/schemas/documents/project'
import duration from '@/sanity/schemas/objects/duration'
import footer from '@/sanity/schemas/objects/global/footer'
import linkExternal from '@/sanity/schemas/objects/link/linkExternal'
import linkInternal from '@/sanity/schemas/objects/link/linkInternal'
import milestone from '@/sanity/schemas/objects/milestone'
import body from '@/sanity/schemas/objects/modules/body'
import ctaSection from '@/sanity/schemas/objects/modules/ctaSection'
import featureItem from '@/sanity/schemas/objects/modules/featureItem'
import featuresection from '@/sanity/schemas/objects/modules/featuresection'
import herosection from '@/sanity/schemas/objects/modules/herosection'
import statsection from '@/sanity/schemas/objects/modules/statsection'
import timeline from '@/sanity/schemas/objects/timeline'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Personal Website with Sanity.io'
export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      // Documents
      duration,
      page,
      project,
      //global
      footer,
      //Link
      linkExternal,
      linkInternal,
      // Objects
      milestone,
      timeline,
      // Objects
      body,
      herosection,
      featureItem,
      featuresection,
      statsection,
      ctaSection,
    ],
  },

  plugins: [
    structureTool({
      structure: pageStructure([home, settings]),
    }),
    presentationTool({
      resolve,
      previewUrl: {previewMode: {enable: '/api/draft-mode/enable'}},
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add an image asset source for Unsplash
    //unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
