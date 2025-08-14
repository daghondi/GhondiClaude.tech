#!/usr/bin/env node
/**
 * Vercel Routes Manifest Fix
 * Copy only the routes-manifest.json file to where Vercel expects it
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Vercel routes manifest location...');

const sourceFile = path.join(process.cwd(), '.next', 'routes-manifest.json');
const targetDir = path.join(process.cwd(), 'frontend', '.next');
const targetFile = path.join(targetDir, 'routes-manifest.json');

try {
  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Copy only the routes-manifest.json file
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetFile);
    console.log('✅ routes-manifest.json copied to frontend/.next/');
  } else {
    // Create a basic routes-manifest.json if it doesn't exist
    const basicManifest = {
      "version": 3,
      "pages404": true,
      "basePath": "",
      "redirects": [],
      "headers": [],
      "dynamicRoutes": [],
      "staticRoutes": [],
      "dataRoutes": [],
      "i18n": null
    };
    fs.writeFileSync(targetFile, JSON.stringify(basicManifest, null, 2));
    console.log('✅ Created basic routes-manifest.json in frontend/.next/');
  }
  
  console.log('🎯 Vercel should now find the routes manifest');
} catch (error) {
  console.error('❌ Error fixing routes manifest:', error.message);
  process.exit(1);
}
