# PowerShell deployment script for GhondiClaude.me
# This script automates the deployment process to Vercel

Write-Host "🚀 Starting deployment process for GhondiClaude.me..." -ForegroundColor Green

# Check if we're in the frontend directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the frontend directory." -ForegroundColor Red
    exit 1
}

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (!$vercelInstalled) {
    Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Build the project locally to check for errors
Write-Host "🔨 Building project locally..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Please fix the errors before deploying." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Local build successful!" -ForegroundColor Green

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "📋 Don't forget to:" -ForegroundColor Yellow
Write-Host "   1. Add environment variables in Vercel dashboard" -ForegroundColor White
Write-Host "   2. Configure your custom domain (if applicable)" -ForegroundColor White
Write-Host "   3. Update Sanity CORS settings with your production domain" -ForegroundColor White
