#!/usr/bin/env pwsh
# Deployment script for GhondiClaude.me

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("development", "staging", "production")]
    [string]$Environment
)

Write-Host "🚀 Deploying GhondiClaude.me to $Environment..." -ForegroundColor Cyan

# Verify environment variables
if ($Environment -eq "production") {
    Write-Host "⚠️  Deploying to PRODUCTION environment" -ForegroundColor Yellow
    $confirmation = Read-Host "Are you sure you want to deploy to production? (y/N)"
    if ($confirmation -ne "y" -and $confirmation -ne "Y") {
        Write-Host "❌ Deployment cancelled" -ForegroundColor Red
        exit 1
    }
}

# Change to frontend directory
Set-Location frontend

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm ci --production=false

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Run build
Write-Host "🏗️ Building application..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# Deploy based on environment
switch ($Environment) {
    "development" {
        Write-Host "🌱 Deploying to development environment..." -ForegroundColor Green
        # Add development deployment commands here
        # Example: vercel --env=development
    }
    "staging" {
        Write-Host "🧪 Deploying to staging environment..." -ForegroundColor Yellow
        # Add staging deployment commands here
        # Example: vercel --env=staging
    }
    "production" {
        Write-Host "🏭 Deploying to production environment..." -ForegroundColor Red
        # Add production deployment commands here
        # Example: vercel --prod
    }
}

# Return to root directory
Set-Location ..

Write-Host ""
Write-Host "🎉 Deployment to $Environment completed!" -ForegroundColor Green
Write-Host "🌐 Your site should be live shortly" -ForegroundColor Cyan
