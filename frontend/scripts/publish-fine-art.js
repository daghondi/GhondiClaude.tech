const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function publishFineArtProjects() {
  try {
    console.log('🎨 Publishing your Fine Art projects...\n')
    
    // Find all draft fine art projects
    const draftFineArtProjects = await client.fetch(`
      *[_type == "project" && projectType == "fine-art" && status != "published"] {
        _id,
        title,
        slug,
        status,
        featured,
        publishedAt
      }
    `)
    
    if (draftFineArtProjects.length === 0) {
      console.log('✅ All your fine art projects are already published!')
      return
    }
    
    console.log(`📋 Found ${draftFineArtProjects.length} draft fine art projects to publish:`)
    draftFineArtProjects.forEach((project, index) => {
      console.log(`   ${index + 1}. "${project.title}"`)
      console.log(`      Current status: ${project.status || 'No status'}`)
      console.log(`      Published date: ${project.publishedAt || 'Not set'}`)
    })
    
    console.log('\n🔄 Publishing projects...')
    
    // Publish each project
    for (const project of draftFineArtProjects) {
      const updates = {
        status: 'published',
        publishedAt: project.publishedAt || new Date().toISOString(),
        featured: project.featured || false // Keep existing featured status or set to false
      }
      
      console.log(`   ✅ Publishing "${project.title}"...`)
      
      const result = await client
        .patch(project._id)
        .set(updates)
        .commit()
      
      console.log(`      → Status: draft → published`)
      console.log(`      → Published date: ${updates.publishedAt}`)
      console.log(`      → Document revision: ${result._rev}`)
    }
    
    // Verify the changes
    console.log('\n🔍 Verifying published projects...')
    const publishedFineArt = await client.fetch(`
      *[_type == "project" && projectType == "fine-art" && status == "published"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        status,
        featured,
        publishedAt
      }
    `)
    
    console.log(`\n✅ Now you have ${publishedFineArt.length} published fine art projects:`)
    publishedFineArt.forEach((project, index) => {
      console.log(`   ${index + 1}. "${project.title}"`)
      console.log(`      Slug: ${project.slug?.current}`)
      console.log(`      Featured: ${project.featured}`)
      console.log(`      Published: ${new Date(project.publishedAt).toLocaleDateString()}`)
    })
    
    console.log('\n🎉 Success! Your fine art projects should now be visible on your live website!')
    console.log('🌐 Visit https://ghondiclaude.vercel.app/work to see them')
    console.log('⏱️  Changes may take 1-2 minutes to appear due to caching')
    
    // Also fix the CivicAI project type if needed
    const civicAI = await client.fetch(`
      *[_type == "project" && title match "CivicAI*"][0] {
        _id,
        title,
        projectType
      }
    `)
    
    if (civicAI && civicAI.projectType === 'tech-lab') {
      console.log('\n🔧 Also fixing CivicAI project type...')
      await client
        .patch(civicAI._id)
        .set({ projectType: 'technology' })
        .commit()
      console.log('   ✅ CivicAI project type: tech-lab → technology')
    }
    
  } catch (error) {
    console.error('❌ Error publishing fine art projects:', error)
    throw error
  }
}

publishFineArtProjects()
