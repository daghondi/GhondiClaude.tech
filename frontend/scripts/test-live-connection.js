const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Use fresh data, not CDN cached
})

async function testLiveConnection() {
  try {
    console.log('🔍 Testing live Sanity connection...\n')
    
    // Test exact same query as your work page
    const query = `
      *[_type == "project" && status == "published"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        subtitle,
        excerpt,
        projectType,
        featured,
        featuredImage,
        startDate,
        endDate,
        client,
        location,
        technologies,
        tags[]->{name, slug, color},
        category->{name, slug, color},
        publishedAt
      }
    `
    
    console.log('📡 Executing same query as work page...')
    const projects = await client.fetch(query)
    
    console.log(`✅ Found ${projects.length} published projects:`)
    console.log('=' .repeat(60))
    
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`)
      console.log(`   Type: ${project.projectType}`)
      console.log(`   Slug: ${project.slug?.current}`)
      console.log(`   Featured: ${project.featured}`)
      console.log(`   Image: ${project.featuredImage ? 'Yes' : 'No'}`)
      console.log(`   Published: ${new Date(project.publishedAt).toLocaleDateString()}`)
      console.log('   ' + '-'.repeat(40))
    })
    
    // Test with CDN enabled to see if that's the issue
    console.log('\n🌐 Testing with CDN enabled (like production might use)...')
    const cdnClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: '2024-01-01',
      useCdn: true, // This is what production might use
    })
    
    const cdnProjects = await cdnClient.fetch(query)
    console.log(`📦 CDN returned ${cdnProjects.length} projects`)
    
    if (cdnProjects.length !== projects.length) {
      console.log('⚠️  CDN and direct results differ! This might be the issue.')
      console.log('💡 CDN might be cached. Live site might be using stale data.')
    } else {
      console.log('✅ CDN and direct results match')
    }
    
    // Test specific environment variables
    console.log('\n🔧 Environment variables:')
    console.log(`Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.substring(0, 8)}...`)
    console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)
    console.log(`Has API Token: ${process.env.SANITY_API_TOKEN ? 'Yes' : 'No'}`)
    
  } catch (error) {
    console.error('❌ Connection test failed:', error)
    
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.log('\n💡 This looks like an authentication issue.')
      console.log('   Check if your SANITY_API_TOKEN is set correctly in production.')
    }
    
    if (error.message.includes('404') || error.message.includes('Not Found')) {
      console.log('\n💡 This looks like a project/dataset issue.')
      console.log('   Check if NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET are correct.')
    }
  }
}

testLiveConnection()
