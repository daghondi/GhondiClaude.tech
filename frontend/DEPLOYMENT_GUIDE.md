# 🚀 Deployment Guide for GhondiClaude.me

## ✅ **Ready for Deployment!**

Your site is now configured with compatible Sanity versions and ready to deploy on Vercel.

## 📋 **Deployment Steps**

### **Step 1: Deploy on Vercel**

1. **Go to Vercel**: [vercel.com](https://vercel.com)
2. **Sign up/Login** with your GitHub account
3. **New Project**: Click "New Project" button
4. **Import Repository**: 
   - Find and select your `GhondiClaude.tech` repository
   - Click "Import"

### **Step 2: Configure Project Settings**

When setting up the project:

- **Framework Preset**: Next.js (should auto-detect)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install`

### **Step 3: Add Environment Variables**

In the Vercel project setup, add these environment variables:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=tu4k8iw1
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skTmxORpl3dkbxM8r05doU65J5I1wtsZPtS350cS7Y0bfJb7SRzgXqJUldBgotr3SyieZTfEhbTmF3jbNpoH6KIrPCQ5c8gg7pLgU2CqVbYCcA8nr7EtFTYFizXODhxZlqOtDpWDi7kHTz4s2Agw7i06A1tJ6kxpn4BEJ8Pvt0J11KBxz5o9
NEXT_PUBLIC_SITE_URL=https://ghondiclaude.me
NEXT_PUBLIC_SITE_NAME=GhondiClaude.me
NEXT_PUBLIC_ENABLE_AR=true
NEXT_PUBLIC_ENABLE_3D=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
ADMIN_EMAIL=admin@ghondiclaude.me
```

### **Step 4: Deploy**

Click **"Deploy"** and wait for the build to complete (usually 2-5 minutes).

### **Step 5: Connect Your Domain**

After successful deployment:

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Click **"Domains"** tab
   - Add `ghondiclaude.me`
   - Add `www.ghondiclaude.me`

2. **Copy DNS Records**: Vercel will provide DNS records

3. **In Namecheap**:
   - Login to your Namecheap account
   - Go to "Domain List" → Manage your domain
   - Go to "Advanced DNS"
   - Add the DNS records provided by Vercel:
     ```
     Type: A Record
     Host: @
     Value: [Vercel IP - they'll provide this]
     
     Type: CNAME Record
     Host: www
     Value: [your-app-name].vercel.app
     ```

### **Step 6: Test Your Live Site**

Once DNS propagates (5-30 minutes):

- **Your Website**: `https://ghondiclaude.me`
- **Sanity Admin**: `https://ghondiclaude.me/admin`
- **Dynamic Projects**: `https://ghondiclaude.me/projects-dynamic`

## 🎯 **What's Fixed**

- ✅ **Sanity Version Conflict**: Downgraded to compatible versions
- ✅ **NPM Configuration**: Added `.npmrc` for legacy peer deps
- ✅ **Build Compatibility**: Removed Google Fonts build-time dependency
- ✅ **TypeScript Issues**: Fixed path mappings and type errors

## 🔧 **If Deployment Still Fails**

If you encounter any issues, you can also try:

1. **Alternative: Use Netlify**
   - Connect your GitHub repo to Netlify
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`

2. **Manual Deploy**
   - Build locally: `npm run build`
   - Deploy the `.next` folder to any static hosting

## ✨ **After Deployment**

Once your site is live:

1. **Access Sanity Studio**: `yourdomain.com/admin`
2. **Add Content**: Create projects, blog posts, and configure settings
3. **Test Features**: Check all pages and functionality
4. **Configure Analytics**: Add Google Analytics if needed
5. **Set up Email**: Configure SMTP for contact forms

Your professional portfolio with full CMS capabilities is ready to go live! 🎉
