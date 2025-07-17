const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function checkSiteSettings() {
  try {
    const settings = await client.fetch('*[_type == "siteSettings"][0]')
    console.log('Current site settings:', JSON.stringify(settings, null, 2))
    
    // Check if professionalHeadshot field exists
    if (settings.professionalHeadshot) {
      console.log('✅ Professional headshot field exists')
    } else {
      console.log('❌ Professional headshot field missing')
    }
  } catch (error) {
    console.error('Error checking site settings:', error)
  }
}

checkSiteSettings()
