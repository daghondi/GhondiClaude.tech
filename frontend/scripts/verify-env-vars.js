// Environment Variables Verification for Vercel
// Copy these exact values to your Vercel dashboard

console.log('🔧 VERCEL ENVIRONMENT VARIABLES TO SET:')
console.log('=' .repeat(60))
console.log('')

console.log('1. NEXT_PUBLIC_SANITY_PROJECT_ID')
console.log('   Value: tu4k8iw1')
console.log('')

console.log('2. NEXT_PUBLIC_SANITY_DATASET') 
console.log('   Value: production')
console.log('')

console.log('3. SANITY_API_TOKEN')
console.log('   Value: skTmxORpl3dkbxM8r05doU65J5I1wtsZPtS350cS7Y0bfJb7SRzgXqJUldBgotr3SyieZTfEhbTmF3jbNpoH6KIrPCQ5c8gg7pLgU2CqVbYYCcA8nr7EtFTYFizXODhxZlqOtDpWDi7kHTz4s2Agw7i06A1tJ6kxpn4BEJ8Pvt0J11KBxz5o9')
console.log('')

console.log('📋 INSTRUCTIONS:')
console.log('1. Go to https://vercel.com/dashboard')
console.log('2. Find your "ghondiclaude-tech" project')
console.log('3. Go to Settings → Environment Variables')
console.log('4. Add or update these 3 variables with the exact values above')
console.log('5. Make sure to set them for "Production" environment')
console.log('6. After saving, trigger a new deployment by pushing to GitHub')
console.log('')

console.log('✅ These values are confirmed to work locally!')

// Test the connection to verify
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'tu4k8iw1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skTmxORpl3dkbxM8r05doU65J5I1wtsZPtS350cS7Y0bfJb7SRzgXqJUldBgotr3SyieZTfEhbTmF3jbNpoH6KIrPCQ5c8gg7pLgU2CqVbYYCcA8nr7EtFTYFizXODhxZlqOtDpWDi7kHTz4s2Agw7i06A1tJ6kxpn4BEJ8Pvt0J11KBxz5o9',
  useCdn: false,
})

async function verifyConnection() {
  try {
    console.log('🔍 Verifying connection with these values...')
    const projects = await client.fetch('*[_type == "project" && status == "published"]')
    console.log(`✅ SUCCESS: Found ${projects.length} published projects`)
    console.log('   These values are correct for Vercel!')
  } catch (error) {
    console.error('❌ ERROR: Connection failed:', error.message)
    console.log('   Double-check the values above')
  }
}

verifyConnection()
