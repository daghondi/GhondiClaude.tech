/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\app\admin\[[...index]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/admin',
  projectId: 'tu4k8iw1',
  dataset: 'production',
  // Add and edit the content schema in the './sanity/schema' folder
  schema: { types: schemaTypes },
  plugins: [
    deskTool({ structure }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
})
