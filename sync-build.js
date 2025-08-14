#!/usr/bin/env node
/**
 * Super simple Vercel workaround
 * Just symlink the entire .next directory to where Vercel expects it
 */

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(process.cwd(), '.next');
const targetDir = path.join(process.cwd(), 'frontend', '.next');

// Remove target if it exists
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}

// Create symlink or copy
try {
  if (fs.existsSync(sourceDir)) {
    // Try symlink first (fastest)
    try {
      fs.symlinkSync(sourceDir, targetDir, 'dir');
      console.log('✅ Symlinked .next to frontend/.next');
    } catch (symlinkError) {
      // Fallback: copy recursively
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
      copyRecursive(sourceDir, targetDir);
      console.log('✅ Copied .next to frontend/.next');
    }
  }
} catch (error) {
  console.error('❌ Error:', error.message);
}
