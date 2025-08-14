#!/usr/bin/env node
/**
 * Super simple Vercel workaround
 * Symlink both .next and node_modules to where Vercel expects them
 */

const fs = require('fs');
const path = require('path');

const sourceNextDir = path.join(process.cwd(), '.next');
const targetNextDir = path.join(process.cwd(), 'frontend', '.next');
const sourceNodeModules = path.join(process.cwd(), 'node_modules');
const targetNodeModules = path.join(process.cwd(), 'frontend', 'node_modules');

// Remove targets if they exist
[targetNextDir, targetNodeModules].forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Ensure frontend directory exists
const frontendDir = path.join(process.cwd(), 'frontend');
if (!fs.existsSync(frontendDir)) {
  fs.mkdirSync(frontendDir, { recursive: true });
}

try {
  // Symlink .next directory
  if (fs.existsSync(sourceNextDir)) {
    fs.symlinkSync(sourceNextDir, targetNextDir, 'dir');
    console.log('✅ Symlinked .next to frontend/.next');
  }
  
  // Symlink node_modules directory
  if (fs.existsSync(sourceNodeModules)) {
    fs.symlinkSync(sourceNodeModules, targetNodeModules, 'dir');
    console.log('✅ Symlinked node_modules to frontend/node_modules');
  }
  
  console.log('🎯 Vercel should now find all expected files');
} catch (error) {
  console.error('❌ Symlink failed, trying copy fallback...');
  
  // Fallback: copy directories (slower but more compatible)
  function copyRecursive(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  try {
    if (fs.existsSync(sourceNextDir)) {
      copyRecursive(sourceNextDir, targetNextDir);
      console.log('✅ Copied .next to frontend/.next');
    }
    
    // For node_modules, only copy essential modules to avoid huge copy
    const essentialModules = [
      'styled-jsx', 'next', 'react', 'react-dom', 
      '@next', 'postcss', 'tailwindcss', 'autoprefixer'
    ];
    
    if (fs.existsSync(sourceNodeModules)) {
      fs.mkdirSync(targetNodeModules, { recursive: true });
      for (const moduleName of essentialModules) {
        const srcModule = path.join(sourceNodeModules, moduleName);
        const destModule = path.join(targetNodeModules, moduleName);
        if (fs.existsSync(srcModule)) {
          copyRecursive(srcModule, destModule);
          console.log(`✅ Copied ${moduleName} to frontend/node_modules`);
        }
      }
    }
  } catch (copyError) {
    console.error('❌ Copy fallback failed:', copyError.message);
    process.exit(1);
  }
}
