# Sanity CMS Setup Guide for GhondiClaude.me

This guide will help you set up Sanity CMS for your portfolio website, giving you a powerful admin interface to manage content without touching code.

## 🚀 Quick Start

### 1. Create a Sanity Account

1. Go to [sanity.io](https://www.sanity.io) and create a free account
2. Click "Create new project"
3. Choose a project name (e.g., "GhondiClaude Portfolio")
4. Select "Production" as your dataset name
5. Copy your **Project ID** and **Dataset** name

### 2. Get Your API Token

1. In your Sanity project dashboard, go to **Settings** > **API**
2. Click **Add API token**
3. Name it "Website Token"
4. Set permissions to **Editor** or **Admin**
5. Copy the generated token

### 3. Configure Environment Variables

Create a `.env.local` file in your frontend directory:

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# Other existing variables...
```

### 4. Access Your Admin Panel

Once configured, you can access your Sanity Studio at:
```
http://localhost:3000/admin
```

## 📝 Content Management

### Content Types Available

#### 1. **Projects**
- **Title & Slug**: Main project information
- **Project Type**: Fine Art, Urban Planning, or Tech Lab
- **Content**: Rich text editor with images and formatting
- **Gallery**: Multiple images for project showcases
- **Metadata**: Start/end dates, client, location, technologies
- **SEO**: Meta title and description

#### 2. **Blog Posts**
- **Title & Slug**: Blog post information
- **Content**: Rich text editor with code blocks and images
- **Featured Image**: Main post image
- **Reading Time**: Estimated reading duration
- **Tags & Categories**: Organization and filtering

#### 3. **Categories**
- **Name & Description**: Category information
- **Color & Icon**: Visual styling options
- **Hierarchical**: Support for parent/child categories

#### 4. **Tags**
- **Name & Description**: Tag information
- **Color**: Visual styling for tags

#### 5. **Authors**
- **Profile Information**: Name, bio, avatar
- **Social Links**: Twitter, LinkedIn, GitHub, etc.
- **Contact**: Email and website

#### 6. **Site Settings** (Singleton)
- **Global Settings**: Site title, description, keywords
- **Branding**: Logo, favicon, social share image
- **Contact Info**: Email, phone, address
- **Social Links**: All social media profiles
- **Theme Colors**: Primary, secondary, accent colors
- **Analytics**: Google Analytics, Hotjar IDs

## 🎨 Using the Studio

### Adding New Content

1. **Projects**: Click "Projects" → Choose type → "Create new"
2. **Blog Posts**: Click "Blog Posts" → "Create new"
3. **Categories/Tags**: Add these first to organize your content

### Publishing Content

1. Fill in all required fields (marked with red asterisk)
2. Set status to "Published"
3. Set "Published At" date
4. Click "Publish"

### Managing Media

- Upload images directly in the rich text editor
- All images are automatically optimized
- Add alt text for accessibility
- Captions are optional but recommended

### Featured Content

- Mark projects/posts as "Featured" to show on homepage
- Featured content appears in special sections
- Limit to 3-6 featured items for best performance

## 🔧 Advanced Features

### Rich Text Editor

The content editor supports:
- **Headings**: H1-H4 with proper styling
- **Text Formatting**: Bold, italic, links
- **Images**: Upload with captions and alt text
- **Code Blocks**: Syntax highlighting for multiple languages
- **Lists**: Bulleted and numbered lists
- **Blockquotes**: For highlighting important text

### SEO Optimization

Each content type includes:
- **Meta Title**: Custom title for search engines
- **Meta Description**: Custom description for search results
- **Slug**: URL-friendly identifier
- **Social Image**: Custom image for social sharing

### Project Organization

- **Filter by Type**: View only Fine Art, Urban Planning, or Tech projects
- **Categories**: Organize content by themes
- **Tags**: Add multiple descriptive tags
- **Status**: Draft, Published, or Archived

## 🚀 Going Live

### Production Setup

1. Deploy your website to Vercel/Netlify
2. Add environment variables to your hosting platform
3. Update CORS origins in Sanity project settings
4. Add your production domain to allowed origins

### Content Strategy

1. **Start with Projects**: Add 3-5 of your best projects
2. **Create Categories**: Art, Planning, Technology, etc.
3. **Add Blog Posts**: Share insights and process
4. **Update Site Settings**: Complete your global settings
5. **Create Author Profile**: Add your information

### Backup & Export

- Sanity automatically backs up your content
- Export content via the CLI if needed
- Version history available for all documents

## 📱 Mobile Management

- Sanity Studio works on mobile devices
- Upload images from your phone
- Edit content on the go
- Responsive admin interface

## 🎯 Best Practices

### Content Guidelines

1. **Images**: Use high-quality images (min 1200px wide)
2. **Alt Text**: Always add descriptive alt text
3. **SEO**: Write compelling meta descriptions (150-160 chars)
4. **Slugs**: Keep URLs short and descriptive
5. **Categories**: Don't create too many (5-10 max)

### Performance Tips

1. **Image Optimization**: Sanity automatically optimizes images
2. **Content Caching**: Published content is cached globally
3. **Draft Mode**: Use drafts for work-in-progress content

## 🔒 Security & Access

### User Management

- Add team members in Sanity project settings
- Set appropriate permissions (Viewer, Editor, Admin)
- Use token-based authentication for API access

### Content Moderation

- Preview changes before publishing
- Version history for all content
- Rollback capability for mistakes

## 📞 Support

### Documentation
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-live-preview)

### Community
- [Sanity Slack Community](https://slack.sanity.io)
- [GitHub Issues](https://github.com/sanity-io/sanity/issues)

---

**🎉 You're all set!** Start adding your amazing projects and blog posts to showcase your work to the world.
