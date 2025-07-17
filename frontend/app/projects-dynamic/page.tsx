import { Metadata } from 'next'
import { getProjects, getFeaturedProjects, urlFor } from '../../sanity/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Tag, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Projects | GhondiClaude.me',
  description: 'Explore my portfolio of projects spanning Fine Art, Urban Planning, and Technology.',
}

// This would be the new dynamic version using Sanity data
export default async function ProjectsPage() {
  try {
    // Fetch projects data from Sanity
    const [allProjects, featuredProjects] = await Promise.all([
      getProjects(),
      getFeaturedProjects(),
    ])

    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A collection of projects spanning Fine Art, Urban Planning, and Technology Innovation
            </p>
          </div>

          {/* Featured Projects */}
          {featuredProjects && featuredProjects.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project: any) => (
                  <ProjectCard key={project._id} project={project} featured />
                ))}
              </div>
            </section>
          )}

          {/* All Projects */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8">All Projects</h2>
            {allProjects && allProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allProjects.map((project: any) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-800 rounded-lg p-8 max-w-lg mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    No Projects Yet
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Projects will appear here once you add them to your Sanity CMS.
                  </p>
                  <Link
                    href="/admin"
                    className="inline-flex items-center px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-purple transition-colors"
                  >
                    Open Admin Panel
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching projects:', error)
    
    // Fallback UI when Sanity is not configured
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="bg-gray-800 rounded-lg p-8 max-w-lg mx-auto">
              <h1 className="text-3xl font-bold text-white mb-4">
                Sanity CMS Setup Required
              </h1>
              <p className="text-gray-300 mb-6">
                To use dynamic content, please configure your Sanity CMS environment variables.
              </p>
              <div className="space-y-4">
                <Link
                  href="/admin"
                  className="block w-full px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-purple transition-colors"
                >
                  Open Admin Panel
                </Link>
                <Link
                  href="/work"
                  className="block w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  View Static Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Project Card Component
function ProjectCard({ project, featured = false }: { project: any; featured?: boolean }) {
  const imageUrl = project.featuredImage 
    ? urlFor(project.featuredImage).width(600).height(400).url()
    : '/placeholder-project.jpg'

  const projectTypeColors = {
    'fine-art': 'bg-purple-500/20 text-purple-300',
    'urban-planning': 'bg-blue-500/20 text-blue-300',
    'tech-lab': 'bg-green-500/20 text-green-300',
  }

  return (
    <Link href={`/projects/${project.slug.current}`}>
      <div className={`group bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all duration-300 ${featured ? 'ring-2 ring-accent-blue' : ''}`}>
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {featured && (
            <div className="absolute top-4 left-4 bg-accent-blue text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${projectTypeColors[project.projectType as keyof typeof projectTypeColors] || 'bg-gray-600 text-gray-300'}`}>
              {project.projectType.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">
            {project.title}
          </h3>

          {project.subtitle && (
            <p className="text-gray-400 mb-3">{project.subtitle}</p>
          )}

          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {project.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            {project.publishedAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(project.publishedAt).toLocaleDateString()}
              </div>
            )}
            {project.tags && project.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {project.tags.length} tags
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
