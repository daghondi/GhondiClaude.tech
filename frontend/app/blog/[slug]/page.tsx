import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, Tag, ArrowLeft, Twitter, Linkedin, Copy } from 'lucide-react'

// Mock blog data - replace with actual data from Supabase
const blogPosts = [
  {
    id: 1,
    title: "The Intersection of Art and Urban Planning: Creating Livable Cities",
    slug: "art-urban-planning-livable-cities",
    excerpt: "Exploring how artistic vision can transform urban spaces into thriving, sustainable communities that inspire and connect people.",
    content: `
# The Intersection of Art and Urban Planning: Creating Livable Cities

Urban planning and art might seem like distinct disciplines, but their intersection holds the key to creating truly livable, inspiring cities. As someone who has navigated both worlds, I've discovered that the most successful urban spaces are those that balance functional design with artistic vision.

## The Power of Creative Placemaking

Creative placemaking is more than just adding art to public spaces—it's about integrating artistic thinking into the very foundation of urban design. When we approach city planning with an artist's eye, we create spaces that don't just serve a function, but inspire and connect communities.

### Key Principles

1. **Human-Centered Design**: Every space should prioritize the human experience
2. **Cultural Integration**: Reflect the community's identity and values
3. **Sustainable Beauty**: Create lasting visual impact with environmental responsibility
4. **Interactive Elements**: Design spaces that encourage community engagement

## Case Studies in Artistic Urban Planning

Throughout my career, I've witnessed transformative projects that demonstrate this intersection:

### The High Line, New York City
This elevated park turned abandoned railway into a linear oasis, combining landscape architecture with public art installations. The result is a space that serves multiple functions while maintaining a strong artistic identity.

### Medellín's Urban Acupuncture
The Colombian city's transformation through strategic placement of beautiful, functional public buildings in underserved areas shows how architectural art can catalyze broader urban renewal.

## Technology as a Bridge

Modern technology offers unprecedented opportunities to merge artistic vision with urban functionality:

- **AR-Enhanced Public Spaces**: Augmented reality can layer digital art onto physical environments
- **Smart Lighting Systems**: Dynamic lighting that responds to community activities and events
- **Interactive Installations**: Public art that responds to citizen interaction and environmental data

## Building Communities Through Design

The most successful intersections of art and urban planning prioritize community building:

### Community Engagement Strategies
- Involving residents in the design process
- Creating spaces for informal social interaction
- Designing for accessibility and inclusion
- Supporting local artists and cultural practitioners

## The Future of Artistic Cities

As we move forward, the integration of art and urban planning will become increasingly important. Cities that embrace this intersection will be more resilient, more attractive to residents and visitors, and more successful in creating genuine quality of life.

The future belongs to places that understand that beauty and function are not opposing forces, but complementary aspects of great urban design.

---

*What examples of artistic urban planning have inspired you? I'd love to hear about spaces that have captured your imagination and improved your daily life.*
    `,
    published_at: "2024-01-15",
    reading_time: 8,
    category: "Urban Planning",
    tags: ["urban-design", "sustainability", "community", "art"],
    featured_image: "/images/blog/urban-art.jpg",
    is_featured: true,
    author: {
      name: "Ghondi Claude",
      bio: "Interdisciplinary creator bridging art, urban planning, and technology",
      avatar: "/images/avatar.jpg"
    }
  }
]

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    notFound()
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(post.title)
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(window.location.href)
        // You could add a toast notification here
        break
    }
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-accent-blue hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          {/* Category */}
          <div className="mb-4">
            <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-accent-blue to-white rounded-full"></div>
              <span className="text-white">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.reading_time} min read
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-dark-tertiary text-gray-300 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share Buttons - Static for now */}
          <div className="flex items-center gap-4 pb-8 border-b border-white/10">
            <span className="text-gray-400 text-sm">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://ghondiclaude.me/blog/' + post.slug)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-dark-tertiary hover:bg-accent-blue/20 rounded-lg flex items-center justify-center transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://ghondiclaude.me/blog/' + post.slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-dark-tertiary hover:bg-accent-blue/20 rounded-lg flex items-center justify-center transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <div className="w-10 h-10 bg-dark-tertiary rounded-lg flex items-center justify-center">
              <Copy className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-video bg-gradient-to-br from-accent-blue/20 to-white/10 rounded-lg mb-12 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-accent-blue" />
            </div>
            <p className="text-gray-400">Featured Image</p>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ 
              __html: post.content.split('\n').map(line => {
                if (line.startsWith('# ')) {
                  return `<h1 class="text-3xl md:text-4xl font-heading font-bold mb-6 mt-12">${line.slice(2)}</h1>`
                } else if (line.startsWith('## ')) {
                  return `<h2 class="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">${line.slice(3)}</h2>`
                } else if (line.startsWith('### ')) {
                  return `<h3 class="text-xl md:text-2xl font-heading font-bold mb-3 mt-6">${line.slice(4)}</h3>`
                } else if (line.startsWith('1. ') || line.startsWith('- ')) {
                  return `<li class="text-gray-300 mb-2">${line.slice(2)}</li>`
                } else if (line.startsWith('*') && line.endsWith('*')) {
                  return `<p class="text-gray-400 italic border-l-4 border-accent-blue pl-4 my-6">${line.slice(1, -1)}</p>`
                } else if (line.startsWith('---')) {
                  return `<hr class="border-white/20 my-8">`
                } else if (line.trim() === '') {
                  return '<br>'
                } else {
                  return `<p class="text-gray-300 mb-4 leading-relaxed">${line}</p>`
                }
              }).join('')
            }}
          />
        </div>

        {/* Author Bio */}
        <div className="mt-16 p-8 bg-dark-secondary/50 rounded-lg border border-white/10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-accent-blue to-white rounded-full flex-shrink-0"></div>
            <div>
              <h3 className="text-xl font-heading font-bold mb-2">{post.author.name}</h3>
              <p className="text-gray-300 mb-4">{post.author.bio}</p>
              <Link
                href="/about"
                className="text-accent-blue hover:text-white transition-colors"
              >
                Learn more about me →
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 mb-16">
          <h3 className="text-2xl font-heading font-bold mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="card group hover:border-accent-blue/50 transition-colors"
              >
                <div className="aspect-video bg-gradient-to-br from-accent-blue/20 to-white/10 rounded-lg mb-4 flex items-center justify-center">
                  <Tag className="w-8 h-8 text-accent-blue" />
                </div>
                <h4 className="font-heading font-bold mb-2 group-hover:text-accent-blue transition-colors">
                  {relatedPost.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {relatedPost.excerpt.slice(0, 100)}...
                </p>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each post
export function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.title} | Ghondi Claude`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    }
  }
}
