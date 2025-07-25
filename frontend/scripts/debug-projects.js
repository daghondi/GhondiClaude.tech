const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function debugProjects() {
  try {
    console.log('🔍 Debugging project visibility issue...\n')
    
    // Fetch all projects
    const allProjects = await client.fetch(`
      *[_type == "project"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        projectType,
        status,
        featured,
        publishedAt,
        _createdAt,
        _updatedAt
      }
    `)
    
    console.log(`📊 Total projects found: ${allProjects.length}\n`)
    
    if (allProjects.length === 0) {
      console.log('❌ No projects found in Sanity!')
      console.log('💡 Make sure you created projects in Sanity Studio and published them.')
      return
    }
    
    // Show all projects
    console.log('📋 All projects in Sanity:')
    console.log('=' .repeat(80))
    allProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`)
      console.log(`   ID: ${project._id}`)
      console.log(`   Slug: ${project.slug?.current || 'No slug'}`)
      console.log(`   Type: ${project.projectType || 'No type'}`)
      console.log(`   Status: ${project.status || 'No status'}`)
      console.log(`   Featured: ${project.featured || false}`)
      console.log(`   Published: ${project.publishedAt || 'Not published'}`)
      console.log(`   Created: ${project._createdAt}`)
      console.log(`   Updated: ${project._updatedAt}`)
      console.log('   ' + '-'.repeat(50))
    })
    
    // Check what the frontend filter expects
    const expectedTypes = ['fine-art', 'technology', 'urban-planning']
    console.log(`\n🎯 Frontend expects these project types: ${expectedTypes.join(', ')}`)
    
    // Check which projects match the filter
    const matchingProjects = allProjects.filter(p => 
      expectedTypes.includes(p.projectType?.toLowerCase())
    )
    
    console.log(`\n✅ Projects that match frontend filter: ${matchingProjects.length}`)
    matchingProjects.forEach(project => {
      console.log(`   - ${project.title} (${project.projectType})`)
    })
    
    // Check for published projects
    const publishedProjects = allProjects.filter(p => p.status === 'published')
    console.log(`\n📰 Published projects: ${publishedProjects.length}`)
    publishedProjects.forEach(project => {
      console.log(`   - ${project.title} (Status: ${project.status})`)
    })
    
    // Look for CivicAI specifically
    const civicAI = allProjects.find(p => 
      p.title?.toLowerCase().includes('civic') || 
      p.slug?.current?.includes('civic')
    )
    
    if (civicAI) {
      console.log(`\n🎯 Found CivicAI project:`)
      console.log(`   Title: ${civicAI.title}`)
      console.log(`   Type: ${civicAI.projectType}`)
      console.log(`   Status: ${civicAI.status}`)
      console.log(`   Featured: ${civicAI.featured}`)
      
      if (!expectedTypes.includes(civicAI.projectType?.toLowerCase())) {
        console.log(`\n⚠️  ISSUE FOUND: CivicAI has projectType "${civicAI.projectType}"`)
        console.log(`   But frontend only shows: ${expectedTypes.join(', ')}`)
        console.log(`\n💡 SOLUTION: Either:`)
        console.log(`   1. Change CivicAI projectType to "technology" in Sanity Studio`)
        console.log(`   2. Or update the frontend filter to include "${civicAI.projectType?.toLowerCase()}"`)
      }
    } else {
      console.log(`\n❌ No CivicAI project found`)
      console.log(`💡 Make sure you created it in Sanity Studio with the correct name`)
    }
    
  } catch (error) {
    console.error('❌ Error debugging projects:', error)
  }
}

debugProjects()
