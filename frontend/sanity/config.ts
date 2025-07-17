import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const config = {
  projectId,
  dataset,
  apiVersion: '2024-01-01',
}
