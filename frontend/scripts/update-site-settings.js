const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function updateSiteSettings() {
  try {
    // Update the existing site settings document to include the professionalHeadshot field
    const result = await client
      .patch('siteSettings')
      .set({
        professionalHeadshot: null, // Initialize as null, user can upload later
      })
      .commit()
    
    console.log('✅ Site settings updated successfully!')
    console.log('Updated document:', result)
  } catch (error) {
    console.error('❌ Error updating site settings:', error)
  }
}

updateSiteSettings()
