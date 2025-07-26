const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function debugFineArtProjects() {
  try {
    console.log('🎨 Debugging Fine Art Projects visibility...\n')
    
    // Fetch all projects
    const allProjects = await client.fetch(`
      *[_type == "project"] | order(_createdAt desc) {
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
    
    console.log(`📊 Total projects in Sanity: ${allProjects.length}\n`)
    
    if (allProjects.length === 0) {
      console.log('❌ No projects found in Sanity!')
      return
    }
    
    // Show all projects
    console.log('📋 All projects in database:')
    console.log('=' .repeat(80))
    allProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title || '[No Title]'}`)
      console.log(`   ID: ${project._id}`)
      console.log(`   Slug: ${project.slug?.current || 'No slug'}`)
      console.log(`   Type: ${project.projectType || 'No type'}`)
      console.log(`   Status: ${project.status || 'No status'}`)
      console.log(`   Featured: ${project.featured || false}`)
      console.log(`   Published: ${project.publishedAt || 'Not published'}`)
      console.log(`   Created: ${new Date(project._createdAt).toLocaleString()}`)
      console.log('   ' + '-'.repeat(50))
    })
    
    // Filter by fine-art projects
    const fineArtProjects = allProjects.filter(p => p.projectType === 'fine-art')
    console.log(`\n🎨 Fine Art projects found: ${fineArtProjects.length}`)
    
    if (fineArtProjects.length > 0) {
      console.log('Fine Art Projects:')
      fineArtProjects.forEach((project, index) => {
        console.log(`   ${index + 1}. ${project.title}`)
        console.log(`      Status: ${project.status}`)
        console.log(`      Featured: ${project.featured}`)
        console.log(`      Published: ${project.publishedAt || 'Not published'}`)
      })
    }
    
    // Check published fine art projects (what frontend will show)
    const publishedFineArt = allProjects.filter(p => 
      p.projectType === 'fine-art' && p.status === 'published'
    )
    console.log(`\n✅ Published Fine Art projects: ${publishedFineArt.length}`)
    
    if (publishedFineArt.length > 0) {
      console.log('These should appear on your website:')
      publishedFineArt.forEach((project, index) => {
        console.log(`   ${index + 1}. ${project.title}`)
        console.log(`      Slug: ${project.slug?.current}`)
        console.log(`      Published: ${project.publishedAt}`)
      })
    } else {
      console.log('❌ No published fine art projects found!')
      console.log('\n💡 Issues to check:')
      
      // Check for draft fine art projects
      const draftFineArt = allProjects.filter(p => 
        p.projectType === 'fine-art' && p.status !== 'published'
      )
      
      if (draftFineArt.length > 0) {
        console.log(`   - You have ${draftFineArt.length} fine art project(s) with status != "published":`)
        draftFineArt.forEach(p => {
          console.log(`     • "${p.title}" has status: "${p.status || 'No status'}"`)
        })
        console.log('   → FIX: Change status to "published" in Sanity Studio')
      }
      
      // Check for projects with wrong type
      const wrongTypeProjects = allProjects.filter(p => 
        p.projectType && p.projectType !== 'fine-art' && p.projectType !== 'technology' && p.projectType !== 'urban-planning'
      )
      
      if (wrongTypeProjects.length > 0) {
        console.log(`   - You have ${wrongTypeProjects.length} project(s) with unexpected projectType:`)
        wrongTypeProjects.forEach(p => {
          console.log(`     • "${p.title}" has type: "${p.projectType}"`)
        })
        console.log('   → FIX: Change projectType to "fine-art", "technology", or "urban-planning"')
      }
    }
    
    // Check what the frontend query would return
    console.log('\n🔍 Testing frontend query...')
    const frontendQuery = `
      *[_type == "project" && status == "published"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        projectType,
        status,
        publishedAt
      }
    `
    
    const frontendResults = await client.fetch(frontendQuery)
    console.log(`Frontend would show ${frontendResults.length} projects total`)
    
    const frontendFineArt = frontendResults.filter(p => p.projectType === 'fine-art')
    console.log(`Frontend would show ${frontendFineArt.length} fine art projects`)
    
    if (frontendFineArt.length > 0) {
      console.log('Frontend fine art projects:')
      frontendFineArt.forEach((project, index) => {
        console.log(`   ${index + 1}. ${project.title}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Error debugging projects:', error)
  }
}

debugFineArtProjects()
