import { NextRequest, NextResponse } from 'next/server'

// Mock blog data - replace with actual Supabase queries
const blogPosts = [
  {
    id: 1,
    title: "The Intersection of Art and Urban Planning: Creating Livable Cities",
    slug: "art-urban-planning-livable-cities",
    excerpt: "Exploring how artistic vision can transform urban spaces into thriving, sustainable communities that inspire and connect people.",
    content: "# The Intersection of Art and Urban Planning...",
    published_at: "2024-01-15",
    reading_time: 8,
    category: "Urban Planning",
    tags: ["urban-design", "sustainability", "community", "art"],
    featured_image: "/images/blog/urban-art.jpg",
    is_featured: true,
    is_published: true,
    view_count: 245,
    like_count: 18,
    author: {
      name: "Ghondi Claude",
      bio: "Interdisciplinary creator bridging art, urban planning, and technology",
      avatar: "/images/avatar.jpg"
    }
  },
  {
    id: 2,
    title: "AI in Creative Process: Augmenting Human Imagination",
    slug: "ai-creative-process-human-imagination",
    excerpt: "How artificial intelligence tools are becoming collaborators in the creative process, enhancing rather than replacing human creativity.",
    content: "# AI in Creative Process...",
    published_at: "2024-01-10",
    reading_time: 6,
    category: "Technology",
    tags: ["artificial-intelligence", "creativity", "innovation", "future"],
    featured_image: "/images/blog/ai-creativity.jpg",
    is_featured: false,
    is_published: true,
    view_count: 187,
    like_count: 23,
    author: {
      name: "Ghondi Claude",
      bio: "Interdisciplinary creator bridging art, urban planning, and technology",
      avatar: "/images/avatar.jpg"
    }
  },
  // Add more posts as needed
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const search = searchParams.get('search')

    let filteredPosts = blogPosts.filter(post => post.is_published)

    // Filter by category
    if (category && category !== 'All') {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Filter by featured status
    if (featured === 'true') {
      filteredPosts = filteredPosts.filter(post => post.is_featured)
    }

    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase()
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Sort by published date (newest first)
    filteredPosts.sort((a, b) => 
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )

    // Pagination
    const total = filteredPosts.length
    const posts = filteredPosts.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: {
        posts,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      }
    })

  } catch (error) {
    console.error('Blog posts API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch blog posts'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // This would handle creating new blog posts
    // For now, return a placeholder response
    const body = await request.json()
    
    // TODO: Validate user authentication/authorization
    // TODO: Validate blog post data
    // TODO: Save to Supabase
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Blog post creation not implemented yet'
      },
      { status: 501 }
    )

  } catch (error) {
    console.error('Blog post creation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create blog post'
      },
      { status: 500 }
    )
  }
}
