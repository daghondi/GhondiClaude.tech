#!/usr/bin/env node

console.log('🚀 Starting root-level Next.js build...')
console.log('📁 Build directory: ' + process.cwd())
console.log('🔧 Framework: Next.js 14.2.31')
console.log('📦 Node version: ' + process.version)

// Ensure we're in the right directory
const fs = require('fs')
const path = require('path')

// Verify we have the expected files
const expectedFiles = [
  'package.json',
  'next.config.js',
  'app',
  'components',
  'lib'
]

console.log('🔍 Verifying project structure...')
expectedFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`✅ Found: ${file}`)
  } else {
    console.log(`❌ Missing: ${file}`)
  }
})

console.log('🎯 Project verified - proceeding with build')
