#!/usr/bin/env pwsh
# Development setup script for GhondiClaude.tech

Write-Host "🎨 Setting up GhondiClaude.tech development environment..." -ForegroundColor Cyan

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check Node.js version
$nodeVersion = node --version
$versionNumber = [version]($nodeVersion -replace 'v', '')
$minVersion = [version]"18.0.0"

if ($versionNumber -lt $minVersion) {
    Write-Host "❌ Node.js version $nodeVersion detected. Please upgrade to Node.js 18+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js version $nodeVersion detected" -ForegroundColor Green

# Change to frontend directory
Set-Location frontend

# Install dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Frontend dependencies installed successfully" -ForegroundColor Green

# Copy environment file if it doesn't exist
if (!(Test-Path ".env.local")) {
    Copy-Item ".env.example" ".env.local"
    Write-Host "📋 Created .env.local from .env.example" -ForegroundColor Yellow
    Write-Host "⚠️  Please update .env.local with your actual environment variables" -ForegroundColor Yellow
}

# Return to root directory
Set-Location ..

Write-Host ""
Write-Host "🎉 Development environment setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update frontend/.env.local with your Supabase credentials" -ForegroundColor White
Write-Host "2. Set up your Supabase database using the migrations in database/" -ForegroundColor White
Write-Host "3. Run 'npm run dev' in the frontend directory to start development" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
