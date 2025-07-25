const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function addCivicAIProject() {
  try {
    // Check if CivicAI project already exists
    const existing = await client.fetch('*[_type == "project" && slug.current == "civic-ai"][0]')
    
    if (existing) {
      console.log('CivicAI project already exists:', existing._id)
      return existing
    }

    // Create the CivicAI project
    const civicAIProject = {
      _type: 'project',
      title: 'CivicAI',
      slug: {
        _type: 'slug',
        current: 'civic-ai'
      },
      subtitle: 'AI-Powered Urban Planning Assistant',
      excerpt: 'An intelligent system that assists urban planners in creating more sustainable and livable cities through AI-driven insights and data analysis.',
      projectType: 'Tech Lab',
      status: 'published',
      featured: true,
      publishedAt: new Date().toISOString(),
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      client: 'Urban Planning Initiative',
      location: 'Smart Cities Program',
      technologies: [
        'Python',
        'TensorFlow',
        'OpenAI GPT',
        'React',
        'Node.js',
        'PostgreSQL',
        'GIS',
        'Machine Learning'
      ],
      content: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'CivicAI represents the cutting edge of urban planning technology, combining artificial intelligence with comprehensive city data to provide actionable insights for creating more sustainable, livable, and efficient urban environments.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'features',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'Key Features'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'feature1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: '• Smart zoning recommendations based on demographic and traffic patterns\n• Real-time environmental impact assessments\n• Predictive modeling for infrastructure development\n• Community engagement analytics\n• Integration with existing GIS systems'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'impact',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'Impact & Results'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'results',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'CivicAI has been successfully piloted in 3 major cities, resulting in 25% more efficient land use planning, 30% reduction in environmental impact assessments time, and significantly improved community satisfaction scores.'
            }
          ]
        }
      ],
      seo: {
        metaTitle: 'CivicAI - AI-Powered Urban Planning Assistant | Ghondi Claude',
        metaDescription: 'Discover CivicAI, an innovative AI system that revolutionizes urban planning through intelligent data analysis and sustainable city design recommendations.',
      },
      links: {
        demo: 'https://civic-ai-demo.ghondiclaude.me',
        repository: 'https://github.com/daghondi/civic-ai',
        documentation: 'https://docs.civic-ai.com'
      }
    }

    const result = await client.create(civicAIProject)
    console.log('✅ CivicAI project created successfully:', result._id)
    console.log('🚀 Project is now available at: /work')
    return result
  } catch (error) {
    console.error('❌ Error creating CivicAI project:', error)
    throw error
  }
}

async function addMoreProjects() {
  try {
    // Add a Fine Art project
    const artProject = {
      _type: 'project',
      title: 'Urban Reflections',
      slug: {
        _type: 'slug',
        current: 'urban-reflections'
      },
      subtitle: 'Mixed Media Art Series',
      excerpt: 'A collection of paintings exploring the intersection of human emotion and urban architecture.',
      projectType: 'Fine Art',
      status: 'published',
      featured: true,
      publishedAt: new Date().toISOString(),
      startDate: '2023-06-01',
      endDate: '2024-02-01',
      content: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Urban Reflections is an artistic exploration of how modern city life shapes our emotional landscape. Through oil paintings and mixed media, this series captures the subtle interplay between concrete environments and human experience.'
            }
          ]
        }
      ],
      seo: {
        metaTitle: 'Urban Reflections Art Series | Ghondi Claude Fine Art',
        metaDescription: 'Explore the Urban Reflections art series - mixed media paintings that capture the essence of human emotion within urban architecture.',
      }
    }

    // Add an Urban Planning project
    const planningProject = {
      _type: 'project',
      title: 'Green Corridor Initiative',
      slug: {
        _type: 'slug',
        current: 'green-corridor-initiative'
      },
      subtitle: 'Sustainable Urban Development',
      excerpt: 'A comprehensive urban planning project focused on creating green corridors that connect communities while promoting environmental sustainability.',
      projectType: 'Urban Planning',
      status: 'published',
      featured: true,
      publishedAt: new Date().toISOString(),
      startDate: '2023-03-01',
      endDate: '2024-08-01',
      client: 'Metropolitan Planning Commission',
      location: 'Downtown Core Development',
      content: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'The Green Corridor Initiative reimagines urban connectivity through sustainable design principles. This project creates pedestrian-friendly pathways that integrate natural elements with modern infrastructure.'
            }
          ]
        }
      ],
      seo: {
        metaTitle: 'Green Corridor Initiative | Urban Planning by Ghondi Claude',
        metaDescription: 'Discover the Green Corridor Initiative - a sustainable urban development project that connects communities through innovative green infrastructure design.',
      }
    }

    // Create all projects
    await client.create(artProject)
    console.log('✅ Urban Reflections art project created')
    
    await client.create(planningProject)
    console.log('✅ Green Corridor Initiative project created')

  } catch (error) {
    console.error('❌ Error creating additional projects:', error)
  }
}

async function main() {
  console.log('🚀 Adding CivicAI project and sample projects to Sanity CMS...')
  
  try {
    await addCivicAIProject()
    await addMoreProjects()
    
    console.log('\n✅ All projects added successfully!')
    console.log('🌐 Visit your website to see the projects')
    console.log('⚙️  Access Sanity Studio at /admin to manage content')
    
  } catch (error) {
    console.error('❌ Failed to add projects:', error)
    process.exit(1)
  }
}

// Run the script
main()
