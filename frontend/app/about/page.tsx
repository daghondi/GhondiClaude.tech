import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getSiteSettings, urlFor } from '@/sanity/utils'

export const metadata: Metadata = {
  title: 'About | GhondiClaude.me',
  description: 'Learn about Ghondi Claude\'s journey across Fine Art, Urban Planning, and Technology.',
}

export default async function AboutPage() {
  // Fetch site settings to get the professional headshot and content
  const siteSettings = await getSiteSettings()
  
  // Default journey items if not set in CMS
  const defaultJourneyItems = [
    {
      role: 'Fine Artist',
      period: '2015 - Present',
      title: 'Artistic Expression',
      description: 'My journey began with traditional fine arts, exploring the depths of human emotion through paintings and mixed media. Each piece tells a story of connection, transformation, and the beauty found in everyday moments.',
      emoji: '🎨',
      skills: ['Oil Painting', 'Mixed Media', 'Digital Art']
    },
    {
      role: 'Urban Planner',
      period: '2018 - Present', 
      title: 'Master of Engineering (MEng)',
      description: 'Pursuing a Master\'s in Urban Planning opened my eyes to the intricate dance between human behavior and built environments. I focus on sustainable development and community-centered design principles.',
      emoji: '🏙️',
      skills: ['Sustainable Design', 'Community Planning', 'Smart Cities']
    },
    {
      role: 'Tech Enthusiast',
      period: '2020 - Present',
      title: 'Digital Innovation', 
      description: 'Technology became the bridge connecting my artistic vision with urban planning solutions. I explore AI, AR, and emerging technologies to create immersive experiences and solve complex urban challenges.',
      emoji: '💻',
      skills: ['AI/ML', 'AR/VR', 'Cybersecurity']
    }
  ]

  // Default values if not set in CMS
  const defaultValues = [
    {
      title: 'Purpose-Driven',
      description: 'Every project serves a greater purpose in improving human experience and community well-being.',
      emoji: '🎯'
    },
    {
      title: 'Sustainable',
      description: 'Committed to creating solutions that consider environmental impact and long-term sustainability.',
      emoji: '🌱'
    },
    {
      title: 'Innovation',
      description: 'Constantly exploring emerging technologies to push the boundaries of what\'s possible.',
      emoji: '🚀'
    }
  ]

  // Default skill categories if not set in CMS
  const defaultSkillCategories = [
    {
      categoryTitle: 'Fine Art',
      skills: ['Oil & Acrylic Painting', 'Digital Illustration', 'Mixed Media', 'Color Theory', 'Composition', 'Art History']
    },
    {
      categoryTitle: 'Urban Planning',
      skills: ['Sustainable Design', 'Community Engagement', 'GIS Analysis', 'Policy Development', 'Traffic Planning', 'Environmental Impact']
    },
    {
      categoryTitle: 'Technology',
      skills: ['React/Next.js', 'Python/AI', 'Three.js/WebGL', 'AR/VR Development', 'Cybersecurity', 'Data Visualization']
    }
  ]

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-accent-blue bg-clip-text text-transparent">
                  {siteSettings?.aboutPageContent?.aboutTitle || "About"}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                {siteSettings?.aboutPageContent?.aboutSubtitle || 
                  "A creative professional at the intersection of Fine Art, Urban Planning, and Technology"
                }
              </p>
              <div className="space-y-4 text-lg text-gray-400">
                <p>
                  {siteSettings?.aboutPageContent?.aboutDescription || 
                    "Welcome to my universe where brushstrokes meet blueprints, where urban dreams are coded into reality, and where technology becomes the canvas for tomorrow's cities."
                  }
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-white/5 to-accent-blue/20 rounded-2xl overflow-hidden">
                {siteSettings?.professionalHeadshot ? (
                  <img
                    src={urlFor(siteSettings.professionalHeadshot).url()}
                    alt={siteSettings.professionalHeadshot.alt || "Ghondi Claude - Professional Profile"}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="w-32 h-32 bg-gradient-to-br from-white/20 to-accent-blue rounded-full mx-auto mb-4"></div>
                      <p>Upload your photo in Sanity CMS</p>
                      <p className="text-sm text-gray-500 mt-2">Go to Site Settings → Professional Headshot</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section">
        <div className="section-container">
          <h2 className="text-4xl font-heading text-center mb-16">
            <span className="text-gradient">
              {siteSettings?.aboutPageExtraContent?.journeyTitle || "My Journey"}
            </span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {(siteSettings?.aboutPageExtraContent?.journeyItems || defaultJourneyItems).map((item: any, index: number) => (
                <div key={index} className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="md:w-1/4 flex-shrink-0">
                    <div className="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-xl">{item.emoji}</span>
                    </div>
                    <div className="text-accent-blue font-semibold">{item.role}</div>
                    <div className="text-gray-500 text-sm">{item.period}</div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-heading mb-4">{item.title}</h3>
                    <p className="text-gray-400 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill: string, skillIndex: number) => (
                        <span key={skillIndex} className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section bg-dark-secondary/50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-heading mb-8">
              <span className="text-gradient">
                {siteSettings?.aboutPageExtraContent?.philosophyTitle || "My Philosophy"}
              </span>
            </h2>
            <blockquote className="text-2xl font-playfair italic text-gray-300 mb-8">
              "{siteSettings?.aboutPageContent?.philosophyQuote || 
                "At the intersection of art, planning, and technology lies the future of human experience. I believe in creating solutions that are not only functional but also beautiful, sustainable, and deeply human."
              }"
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {(siteSettings?.aboutPageExtraContent?.values || defaultValues).map((value: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent-blue text-2xl">{value.emoji}</span>
                  </div>
                  <h3 className="text-xl font-heading mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="section">
        <div className="section-container">
          <h2 className="text-4xl font-heading text-center mb-16">
            <span className="text-gradient">
              {siteSettings?.aboutPageExtraContent?.skillsTitle || "Skills & Expertise"}
            </span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {(siteSettings?.aboutPageExtraContent?.skillCategories || defaultSkillCategories).map((category: any, index: number) => (
              <div key={index} className="card">
                <h3 className="text-2xl font-heading mb-6 text-accent-blue">{category.categoryTitle}</h3>
                <ul className="space-y-3">
                  {category.skills.map((skill: string, skillIndex: number) => (
                    <li key={skillIndex} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-accent-blue rounded-full mr-3"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient-to-br from-dark-primary to-dark-secondary">
        <div className="section-container text-center">
          <h2 className="text-4xl font-heading mb-6">
            <span className="text-gradient">
              {siteSettings?.aboutPageExtraContent?.ctaTitle || "Let's Create Something Amazing"}
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {siteSettings?.aboutPageExtraContent?.ctaDescription || 
              "Whether you're looking for artistic collaboration, urban planning insights, or innovative technology solutions, I'd love to hear about your vision."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              {siteSettings?.globalContent?.commonButtons?.getInTouch || "Get in Touch"}
            </Link>
            <Link href="/work" className="btn-secondary">
              {siteSettings?.globalContent?.commonButtons?.viewProject || "View My Work"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
