#!/usr/bin/env pwsh
# Build script for GhondiClaude.me

Write-Host "🏗️ Building GhondiClaude.me for production..." -ForegroundColor Cyan

# Change to frontend directory
Set-Location frontend

# Type check
Write-Host "🔍 Running TypeScript type check..." -ForegroundColor Yellow
npm run type-check

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ TypeScript type check failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ TypeScript type check passed" -ForegroundColor Green

# Lint check
Write-Host "🔍 Running ESLint..." -ForegroundColor Yellow
npm run lint

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ESLint check failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ ESLint check passed" -ForegroundColor Green

# Build the application
Write-Host "🏗️ Building Next.js application..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully" -ForegroundColor Green

# Return to root directory
Set-Location ..

Write-Host ""
Write-Host "🎉 Production build complete!" -ForegroundColor Green
Write-Host "📦 Built files are in frontend/.next/" -ForegroundColor Cyan
