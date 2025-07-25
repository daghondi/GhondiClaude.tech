const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function fixCivicAIProject() {
  try {
    console.log('🔧 Fixing CivicAI project for visibility...\n')
    
    // Find the CivicAI project
    const civicAI = await client.fetch(`
      *[_type == "project" && title match "CivicAI*"][0] {
        _id,
        title,
        projectType,
        status,
        featured,
        publishedAt
      }
    `)
    
    if (!civicAI) {
      console.log('❌ CivicAI project not found!')
      console.log('💡 Make sure you created it in Sanity Studio first.')
      return
    }
    
    console.log('📋 Current CivicAI project state:')
    console.log(`   ID: ${civicAI._id}`)
    console.log(`   Title: ${civicAI.title}`)
    console.log(`   Type: ${civicAI.projectType || 'No type'}`)
    console.log(`   Status: ${civicAI.status || 'No status'}`)
    console.log(`   Featured: ${civicAI.featured || false}`)
    console.log(`   Published: ${civicAI.publishedAt || 'Not published'}`)
    
    // Prepare the updates
    const updates = {
      projectType: 'technology',
      status: 'published',
      featured: true,
      publishedAt: new Date().toISOString()
    }
    
    console.log('\n🔄 Applying fixes:')
    console.log(`   ✅ projectType: "${civicAI.projectType}" → "technology"`)
    console.log(`   ✅ status: "${civicAI.status}" → "published"`)
    console.log(`   ✅ featured: ${civicAI.featured} → true`)
    console.log(`   ✅ publishedAt: "${civicAI.publishedAt || 'none'}" → "${updates.publishedAt}"`)
    
    // Apply the updates
    const result = await client
      .patch(civicAI._id)
      .set(updates)
      .commit()
    
    console.log('\n✅ CivicAI project updated successfully!')
    console.log(`   Updated document ID: ${result._id}`)
    console.log(`   New revision: ${result._rev}`)
    
    // Verify the changes
    const updatedProject = await client.fetch(`
      *[_id == "${civicAI._id}"][0] {
        title,
        projectType,
        status,
        featured,
        publishedAt
      }
    `)
    
    console.log('\n📋 Updated project state:')
    console.log(`   Title: ${updatedProject.title}`)
    console.log(`   Type: ${updatedProject.projectType}`)
    console.log(`   Status: ${updatedProject.status}`)
    console.log(`   Featured: ${updatedProject.featured}`)
    console.log(`   Published: ${updatedProject.publishedAt}`)
    
    console.log('\n🎉 Your CivicAI project should now be visible on your live website!')
    console.log('🌐 Visit https://ghondiclaude.vercel.app/work to see it')
    console.log('⏱️  It may take a few minutes for the changes to propagate to your live site')
    
  } catch (error) {
    console.error('❌ Error fixing CivicAI project:', error)
    throw error
  }
}

async function main() {
  try {
    await fixCivicAIProject()
    
    // Also clean up any draft projects without titles
    console.log('\n🧹 Cleaning up incomplete draft projects...')
    const incompleteDrafts = await client.fetch(`
      *[_type == "project" && !defined(title)]
    `)
    
    if (incompleteDrafts.length > 0) {
      console.log(`Found ${incompleteDrafts.length} incomplete draft(s)`)
      for (const draft of incompleteDrafts) {
        await client.delete(draft._id)
        console.log(`   Deleted incomplete draft: ${draft._id}`)
      }
    } else {
      console.log('   No incomplete drafts found')
    }
    
    console.log('\n✨ All done! Your project is ready to go live.')
    
  } catch (error) {
    console.error('❌ Script failed:', error)
    process.exit(1)
  }
}

main()
