#!/usr/bin/env node
/**
 * Fresh Deployment Script
 * This script helps deploy to a clean Vercel project to avoid cached configurations
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Fresh Vercel Deployment Script');
console.log('=====================================');

// Check if we're in the right directory
const requiredFiles = ['package.json', 'next.config.js', 'app'];
const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(process.cwd(), file)));

if (missingFiles.length > 0) {
  console.error('❌ Missing required files:', missingFiles.join(', '));
  console.error('Please run this script from the root directory of your Next.js project');
  process.exit(1);
}

console.log('✅ Project structure validated');

// Show current project info
console.log('\n📁 Current Directory:', process.cwd());
console.log('📦 Package.json exists:', fs.existsSync('package.json'));
console.log('⚡ Next.js config exists:', fs.existsSync('next.config.js'));
console.log('📱 App directory exists:', fs.existsSync('app'));

// Instructions for manual deployment
console.log('\n🎯 DEPLOYMENT INSTRUCTIONS');
console.log('==========================');
console.log('Due to Vercel cached configurations, please follow these steps:');
console.log('');
console.log('1. Go to https://vercel.com/new');
console.log('2. Select "Import Git Repository"');
console.log('3. Choose: daghondi/GhondiClaude.tech');
console.log('4. Configure project settings:');
console.log('   - Project Name: ghondi-claude-portfolio-fresh');
console.log('   - Framework Preset: Next.js');
console.log('   - Root Directory: ./ (root)');
console.log('   - Build Command: npm run build');
console.log('   - Output Directory: .next');
console.log('   - Install Command: npm install');
console.log('5. Add Environment Variables (if any)');
console.log('6. Click Deploy');
console.log('');
console.log('7. After deployment, update domain settings:');
console.log('   - Go to Project Settings > Domains');
console.log('   - Add: www.ghondiclaude.me');
console.log('   - Remove domain from old project if needed');
console.log('');
console.log('🎨 Your beautiful Chris Do-inspired theme will be live!');

// Verify build locally first
console.log('\n🔧 VERIFICATION');
console.log('================');
console.log('First, let\'s verify the build works locally...');

try {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('🏗️  Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ LOCAL BUILD SUCCESSFUL!');
  console.log('');
  console.log('🎉 Your project builds successfully!');
  console.log('📤 Ready for fresh Vercel deployment');
  
} catch (error) {
  console.error('❌ Local build failed:', error.message);
  console.error('Please fix build issues before deploying to Vercel');
  process.exit(1);
}
