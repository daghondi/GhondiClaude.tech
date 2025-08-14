#!/usr/bin/env node
/**
 * Copy Build Files Script
 * Workaround for Vercel expecting files in frontend/.next/ directory
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 Copying build files to expected Vercel location...');

const sourceDir = path.join(process.cwd(), '.next');
const targetDir = path.join(process.cwd(), 'frontend', '.next');

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // Ensure frontend/.next exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Copy the entire .next directory
  if (fs.existsSync(sourceDir)) {
    console.log('📁 Copying from:', sourceDir);
    console.log('📁 Copying to:', targetDir);
    
    copyDir(sourceDir, targetDir);
    
    console.log('✅ Build files copied successfully!');
    console.log('📍 Vercel should now find the expected files in frontend/.next/');
  } else {
    console.error('❌ Source .next directory not found:', sourceDir);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error copying build files:', error.message);
  process.exit(1);
}
