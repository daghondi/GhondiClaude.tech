import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowRight, Search } from 'lucide-react'
import { getBlogPosts, getSiteSettings, urlFor } from '@/sanity/utils'

// Get blog posts from Sanity
async function getBlogData() {
  try {
    const posts = await getBlogPosts()
    return posts || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// Fallback mock data in case Sanity is not available
const mockBlogPosts = [
  {
    id: 1,
    title: "The Intersection of Art and Urban Planning: Creating Livable Cities",
    slug: "art-urban-planning-livable-cities",
    excerpt: "Exploring how artistic vision can transform urban spaces into thriving, sustainable communities that inspire and connect people.",
    content: "",
    published_at: "2024-01-15",
    reading_time: 8,
    category: "Urban Planning",
    tags: ["urban-design", "sustainability", "community", "art"],
    featured_image: "/images/blog/urban-art.jpg",
    is_featured: true
  },
  {
    id: 2,
    title: "AI in Creative Process: Augmenting Human Imagination",
    slug: "ai-creative-process-human-imagination",
    excerpt: "How artificial intelligence tools are becoming collaborators in the creative process, enhancing rather than replacing human creativity.",
    content: "",
    published_at: "2024-01-10",
    reading_time: 6,
    category: "Technology",
    tags: ["artificial-intelligence", "creativity", "innovation", "future"],
    featured_image: "/images/blog/ai-creativity.jpg",
    is_featured: false
  },
  {
    id: 3,
    title: "Digital Painting Techniques: From Traditional to Hypermodern",
    slug: "digital-painting-traditional-hypermodern",
    excerpt: "A deep dive into the evolution of painting techniques and how digital tools are expanding the boundaries of artistic expression.",
    content: "",
    published_at: "2024-01-05",
    reading_time: 12,
    category: "Fine Art",
    tags: ["digital-art", "painting", "techniques", "traditional-art"],
    featured_image: "/images/blog/digital-painting.jpg",
    is_featured: false
  },
  {
    id: 4,
    title: "Sustainable Cities: The Role of Technology in Urban Development",
    slug: "sustainable-cities-technology-urban-development",
    excerpt: "Examining how smart city technologies can create more sustainable, efficient, and livable urban environments.",
    content: "",
    published_at: "2024-01-02",
    reading_time: 10,
    category: "Urban Planning",
    tags: ["smart-cities", "sustainability", "technology", "environment"],
    featured_image: "/images/blog/smart-cities.jpg",
    is_featured: false
  },
  {
    id: 5,
    title: "The Philosophy of Creative Problem Solving",
    slug: "philosophy-creative-problem-solving",
    excerpt: "How interdisciplinary thinking leads to innovative solutions that bridge art, science, and human experience.",
    content: "",
    published_at: "2023-12-28",
    reading_time: 7,
    category: "Philosophy",
    tags: ["creativity", "problem-solving", "innovation", "interdisciplinary"],
    featured_image: "/images/blog/creative-thinking.jpg",
    is_featured: false
  },
  {
    id: 6,
    title: "Cybersecurity in the Age of Digital Art",
    slug: "cybersecurity-digital-art-age",
    excerpt: "Protecting digital assets and creative work in an increasingly connected world of NFTs, digital galleries, and online portfolios.",
    content: "",
    published_at: "2023-12-20",
    reading_time: 9,
    category: "Technology",
    tags: ["cybersecurity", "digital-art", "nft", "protection"],
    featured_image: "/images/blog/digital-security.jpg",
    is_featured: false
  }
]

const categories = ["All", "Fine Art", "Urban Planning", "Technology", "Philosophy"]

export default async function BlogPage() {
  const sanityPosts = await getBlogData()
  const siteSettings = await getSiteSettings()
  
  // Use Sanity posts if available, otherwise fall back to mock data
  const blogPosts = sanityPosts.length > 0 ? sanityPosts : mockBlogPosts
  
  const featuredPost = blogPosts.find((post: any) => post.featured || post.is_featured)
  const regularPosts = blogPosts.filter((post: any) => !(post.featured || post.is_featured))

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-accent-blue bg-clip-text text-transparent">
                {siteSettings?.blogPageContent?.blogTitle || "Insights"}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {siteSettings?.blogPageContent?.blogSubtitle || 
                "Thoughts on art, technology, urban planning, and the beautiful intersections between them"
              }
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={siteSettings?.blogPageContent?.searchPlaceholder || "Search articles..."}
                className="input pl-12"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === "All"
                      ? "bg-accent-blue text-white"
                      : "bg-dark-tertiary text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-heading mb-8">Featured Article</h2>
            
            <article className="card p-0 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-square relative overflow-hidden">
                  {featuredPost.featuredImage || featuredPost.featured_image ? (
                    <img
                      src={featuredPost.featuredImage ? urlFor(featuredPost.featuredImage).url() : featuredPost.featured_image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent-blue/20 to-white/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Tag className="w-8 h-8 text-accent-blue" />
                        </div>
                        <p className="text-gray-400">Featured Image</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full">
                      {featuredPost.category?.name || featuredPost.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.publishedAt || featuredPost.published_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readingTime || featuredPost.reading_time} min read
                    </div>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(featuredPost.tags || []).map((tag: any) => (
                      <span
                        key={typeof tag === 'string' ? tag : tag.name}
                        className="px-3 py-1 bg-dark-tertiary text-gray-300 rounded-full text-sm"
                      >
                        #{typeof tag === 'string' ? tag : tag.name}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    href={`/blog/${featuredPost.slug?.current || featuredPost.slug}`}
                    className="btn-primary inline-flex"
                  >
                    Read Full Article
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading mb-8">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post: any) => (
              <article key={post._id || post.id} className="card group">
                {/* Image */}
                <div className="aspect-video rounded-lg mb-6 overflow-hidden">
                  {post.featuredImage || post.featured_image ? (
                    <img
                      src={post.featuredImage ? urlFor(post.featuredImage).url() : post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent-blue/20 to-white/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Tag className="w-6 h-6 text-accent-blue" />
                        </div>
                        <p className="text-gray-400 text-sm">Article Image</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="px-2 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-xs">
                    {post.category?.name || post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.publishedAt || post.published_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readingTime || post.reading_time}m
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-accent-blue transition-colors">
                  {post.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {(post.tags || []).slice(0, 3).map((tag: any) => (
                    <span
                      key={typeof tag === 'string' ? tag : tag.name}
                      className="px-2 py-1 bg-dark-tertiary text-gray-400 rounded text-xs"
                    >
                      #{typeof tag === 'string' ? tag : tag.name}
                    </span>
                  ))}
                </div>
                
                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug?.current || post.slug}`}
                  className="text-accent-blue hover:text-white transition-colors inline-flex items-center gap-1 text-sm font-medium"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section bg-dark-secondary/50">
        <div className="section-container text-center">
          <h2 className="text-4xl font-heading mb-6">
            <span className="text-gradient">Stay Updated</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest insights on art, technology, and urban planning delivered to your inbox.
          </p>
          
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input flex-1"
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
          
          <p className="text-sm text-gray-400 mt-4">
            No spam, unsubscribe anytime. Read our privacy policy.
          </p>
        </div>
      </section>
    </main>
  )
}
