// Script to verify Sanity environment variables and connection
const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

async function verifyEnvironmentAndConnection() {
  console.log('🔍 Verifying Sanity environment variables and connection...\n')

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const apiToken = process.env.SANITY_API_TOKEN

  console.log('📋 Environment Variables:')
  console.log(`   NEXT_PUBLIC_SANITY_PROJECT_ID: ${projectId || '[NOT SET]'}`)
  console.log(`   NEXT_PUBLIC_SANITY_DATASET: ${dataset || '[NOT SET]'}`)
  console.log(`   SANITY_API_TOKEN: ${apiToken ? '[SET - ' + apiToken.substring(0, 8) + '...]' : '[NOT SET]'}`)

  if (!projectId || !dataset) {
    console.log('\n❌ Required public environment variables are missing!')
    console.log('   These MUST be set in your Vercel dashboard for the live site to work:')
    console.log('   - NEXT_PUBLIC_SANITY_PROJECT_ID')
    console.log('   - NEXT_PUBLIC_SANITY_DATASET')
    return
  }

  console.log('\n✅ All required environment variables are set.')
  
  // Test Sanity connection
  try {
    console.log('\n🔌 Testing Sanity connection...')
    
    const client = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      token: apiToken,
      useCdn: false,
    })

    // Test basic connection
    const projects = await client.fetch('*[_type == "project"]')
    console.log(`✅ Connection successful! Found ${projects.length} total projects`)

    // Test published projects (what your live site fetches)
    const publishedProjects = await client.fetch('*[_type == "project" && status == "published"]')
    console.log(`✅ Found ${publishedProjects.length} published projects (these should show on live site)`)

    if (publishedProjects.length > 0) {
      console.log('\n📋 Published Projects:')
      publishedProjects.forEach((project, index) => {
        console.log(`   ${index + 1}. ${project.title} (${project.projectType})`)
      })
    }

    // Test CDN connection (production-like)
    console.log('\n🌐 Testing CDN connection (production-like)...')
    const cdnClient = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true, // This is what production uses
    })

    const cdnProjects = await cdnClient.fetch('*[_type == "project" && status == "published"]')
    console.log(`✅ CDN returned ${cdnProjects.length} published projects`)

    if (cdnProjects.length !== publishedProjects.length) {
      console.log('⚠️  WARNING: CDN results differ from direct results!')
      console.log('   This suggests CDN caching might be affecting your live site.')
      console.log('   Try adding ?t=' + Date.now() + ' to your live site URL to bypass cache.')
    }

    console.log('\n🎯 Verification Summary:')
    console.log('   ✅ Environment variables are properly set')
    console.log('   ✅ Sanity connection is working')
    console.log(`   ✅ ${publishedProjects.length} projects should appear on live site`)
    
    console.log('\n💡 Next Steps:')
    console.log('   1. Ensure these exact values are set in your Vercel dashboard')
    console.log('   2. If projects still don\'t show, try: https://ghondiclaude.me/work?t=' + Date.now())
    console.log('   3. Check Vercel deployment logs for any errors')

  } catch (error) {
    console.error('\n❌ Sanity connection failed:', error.message)
    
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.log('\n💡 Authentication Error:')
      console.log('   - Check if SANITY_API_TOKEN is correct')
      console.log('   - Ensure the token has read permissions')
      console.log('   - Verify the token is set in Vercel dashboard')
    }
    
    if (error.message.includes('404')) {
      console.log('\n💡 Project Not Found Error:')
      console.log('   - Check if NEXT_PUBLIC_SANITY_PROJECT_ID is correct')
      console.log('   - Verify NEXT_PUBLIC_SANITY_DATASET is correct')
      console.log('   - Ensure these values match your Sanity project')
    }
  }
}

verifyEnvironmentAndConnection()
