#!/bin/bash

# Deployment script for GhondiClaude.me
# This script automates the deployment process to Vercel

echo "🚀 Starting deployment process for GhondiClaude.me..."

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the frontend directory."
    exit 1
fi

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build the project locally to check for errors
echo "🔨 Building project locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi

echo "✅ Local build successful!"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "📋 Don't forget to:"
echo "   1. Add environment variables in Vercel dashboard"
echo "   2. Configure your custom domain (if applicable)"
echo "   3. Update Sanity CORS settings with your production domain"
