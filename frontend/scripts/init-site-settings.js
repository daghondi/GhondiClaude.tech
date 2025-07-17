const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function initializeSiteSettings() {
  try {
    // Check if site settings document already exists
    const existing = await client.fetch('*[_type == "siteSettings"][0]')
    
    if (existing) {
      console.log('Site settings document already exists:', existing._id)
      return existing
    }

    // Create initial site settings document
    const siteSettings = {
      _type: 'siteSettings',
      title: 'GhondiClaude.me',
      description: 'Multi-dimensional creative portfolio showcasing Fine Art, Urban Planning, and Technology',
      keywords: ['fine art', 'urban planning', 'technology', 'creative portfolio', 'ghondi claude'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ghondiclaude',
        github: 'https://github.com/daghondi',
        facebook: 'https://facebook.com/ghondiclaude',
        instagram: 'https://instagram.com/ghondiclaude'
      },
      contactInfo: {
        email: 'hello@ghondiclaude.me',
        phone: '+1-555-0123',
        location: 'New York, NY'
      },
      theme: {
        primaryColor: '#3B82F6',
        secondaryColor: '#1F2937',
        accentColor: '#10B981'
      }
    }

    const result = await client.create(siteSettings)
    console.log('Site settings document created successfully:', result._id)
    return result
  } catch (error) {
    console.error('Error initializing site settings:', error)
    throw error
  }
}

initializeSiteSettings()
  .then(() => {
    console.log('✅ Site settings initialized successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Failed to initialize site settings:', error)
    process.exit(1)
  })
