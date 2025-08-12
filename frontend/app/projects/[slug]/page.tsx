import { Metadata } from 'next'
import { getProject, urlFor } from '../../../sanity/utils'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, MapPin, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import ImageLightbox from '../../components/ImageLightbox'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | GhondiClaude.me`,
    description: project.excerpt || project.subtitle,
    openGraph: {
      title: project.title,
      description: project.excerpt || project.subtitle,
      images: project.featuredImage ? [urlFor(project.featuredImage).url()] : [],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  const projectTypeColors = {
    'fine-art': 'bg-purple-500/20 text-purple-300',
    'urban-planning': 'bg-blue-500/20 text-blue-300', 
    'tech-lab': 'bg-green-500/20 text-green-300',
    'technology': 'bg-green-500/20 text-green-300',
  }

  return (
    <main className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Navigation */}
        <Link
          href="/projects-dynamic"
          className="inline-flex items-center text-accent-blue hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              projectTypeColors[project.projectType as keyof typeof projectTypeColors] || 'bg-gray-500/20 text-gray-300'
            }`}>
              {project.projectType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            {project.featured && (
              <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>
          
          {project.subtitle && (
            <p className="text-xl text-gray-300 mb-6">
              {project.subtitle}
            </p>
          )}

          {project.excerpt && (
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              {project.excerpt}
            </p>
          )}

          {/* Project Meta */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {project.startDate && (
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(project.startDate).getFullYear()}
                  {project.endDate && ` - ${new Date(project.endDate).getFullYear()}`}
                </span>
              </div>
            )}
            
            {project.client && (
              <div className="text-gray-400">
                <span className="font-medium text-gray-300">Client:</span> {project.client}
              </div>
            )}
            
            {project.location && (
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                {project.location}
              </div>
            )}

            {project.publishedAt && (
              <div className="text-gray-400">
                <span className="font-medium text-gray-300">Published:</span>{' '}
                {new Date(project.publishedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {project.featuredImage && (
          <div className="mb-12">
            <ImageLightbox
              src={urlFor(project.featuredImage).width(1200).height(600).url()}
              alt={project.title}
              aspectRatio="aspect-video"
              className="w-full object-cover rounded-lg"
              fill={true}
            />
          </div>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Project Content */}
        {project.content && (
          <div className="mb-12">
            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText 
                value={project.content} 
                components={{
                  block: {
                    normal: ({ children }) => <p className="text-gray-300 leading-relaxed mb-6">{children}</p>,
                    h2: ({ children }) => <h2 className="text-3xl font-bold text-white mb-6 mt-12">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h3>,
                  },
                  types: {
                    image: ({ value }: any) => {
                      if (!value?.asset) return null
                      return (
                        <div className="my-8">
                          <ImageLightbox
                            src={urlFor(value).width(800).url()}
                            alt={value.alt || ''}
                            width={800}
                            height={600}
                            className="w-full rounded-lg"
                          />
                        </div>
                      )
                    },
                  },
                  marks: {
                    link: ({ children, value }) => (
                      <a 
                        href={value.href} 
                        className="text-accent-blue hover:text-white transition-colors underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            </div>
          </div>
        )}

        {/* Project Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image: any, index: number) => (
                <div key={index}>
                  <ImageLightbox
                    src={urlFor(image).width(600).height(400).url()}
                    alt={image.caption || `${project.title} - Image ${index + 1}`}
                    aspectRatio="aspect-video"
                    className="w-full object-cover rounded-lg"
                    fill={true}
                  />
                  {image.caption && (
                    <p className="text-gray-400 text-sm mt-2 text-center">
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* External Links */}
        {project.externalLinks && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Links</h2>
            <div className="flex flex-wrap gap-4">
              {project.externalLinks.liveDemo && (
                <a
                  href={project.externalLinks.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.externalLinks.repository && (
                <a
                  href={project.externalLinks.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Repository
                </a>
              )}
              {project.externalLinks.behance && (
                <a
                  href={project.externalLinks.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Behance
                </a>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: any) => (
                <span
                  key={tag._id}
                  className={`px-3 py-1 ${tag.color ? 'bg-opacity-20' : 'bg-gray-800'} text-gray-300 rounded-full text-sm`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center py-12 border-t border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">
            Interested in Similar Work?
          </h2>
          <p className="text-gray-400 mb-6">
            Let's discuss how we can collaborate on your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/projects-dynamic"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-colors"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
