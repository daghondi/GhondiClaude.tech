'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Play, Sparkles, Layers, Code, Palette, Linkedin, Github, Facebook, Instagram } from 'lucide-react'
import Modal from './Modal'
import { urlFor } from '@/sanity/utils'

interface HomePageClientProps {
  siteSettings: any
}

export default function HomePageClient({ siteSettings }: HomePageClientProps) {
  const [currentRole, setCurrentRole] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isArtistStatementOpen, setIsArtistStatementOpen] = useState(false)
  const [isTechnicalSpecsOpen, setIsTechnicalSpecsOpen] = useState(false)
  
  const roles = [
    { title: "Fine Artist", icon: Palette },
    { title: "Urban Planner", icon: Layers },
    { title: "Tech-Preneur", icon: Code }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <main id="main-content" className="min-h-screen overflow-hidden bg-white">
      {/* Hero Section - Professional Light Theme */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        {/* Clean Professional Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
        
        {/* Subtle geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          <div className="absolute top-40 right-32 w-1 h-1 bg-gray-600 rounded-full animate-pulse" />
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-blue-600 rounded-full animate-float" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-1000" />
        </div>
        
        {/* Floating orbs - minimal and sophisticated */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-gradient-to-l from-gray-100/30 to-transparent rounded-full blur-3xl animate-float animation-delay-2000" />
        </div>
        
        {/* Main Content Container */}
        <div className={`relative z-10 max-w-7xl mx-auto px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
              {/* Greeting - Small label like Chris Do */}
              <div className="space-y-6">
                <h6 className="text-xs md:text-sm uppercase tracking-widest text-gray-500 font-medium">
                  {siteSettings?.homepageExtraContent?.greetingText || "Hello World, I'm"}
                </h6>
                
                {/* Name - MASSIVE Chris Do style */}
                <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight leading-none text-gray-900">
                  {siteSettings?.homepageContent?.heroTitle || "Ghondi Claude B."}
                </h1>
              </div>
              
              {/* Professional Tags - Chris Do inspired minimal style */}
              <div className="space-y-6">
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 text-xs md:text-sm">
                  {(siteSettings?.homepageExtraContent?.professionalTags || ['Fine Artist', 'Urban Planner (MEng)', 'Tech Entrepreneur']).map((tag: string, index: number) => (
                    <span key={index} className="px-3 py-1 text-gray-600 font-medium uppercase tracking-wider">
                      {tag}
                      {index < 2 && <span className="ml-2 text-gray-300">•</span>}
                    </span>
                  ))}
                </div>
                
                {/* Bio - Chris Do inspired intro text */}
                <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
                  <p className="text-lg lg:text-xl leading-relaxed text-gray-600 font-light">
                    {siteSettings?.homepageExtraContent?.heroDescription ||
                      "Where Fine Art meets Urban Planning, and Technology bridges the creative divide."
                    }
                  </p>
                  
                  {/* Currently label - small and clean */}
                  <div className="flex items-center space-x-4">
                    <h6 className="text-xs uppercase tracking-widest text-gray-500">Currently</h6>
                    <span className="text-base text-gray-800 font-medium">
                      {roles[currentRole].title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Chris Do minimal style */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
                <Link href="/work" className="group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-700">
                      <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div>
                      <h6 className="text-xs uppercase tracking-widest text-gray-500">Explore</h6>
                      <span className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">My Work</span>
                    </div>
                  </div>
                </Link>
                
                <Link href="/portfolio/fine-art" className="group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-gray-700">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h6 className="text-xs uppercase tracking-widest text-gray-500">View</h6>
                      <span className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">Fine Art Projects</span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Social Links - Professional Style */}
              <div className="flex justify-center lg:justify-start space-x-4 pt-8">
                {siteSettings?.socialLinks?.linkedin && (
                  <a 
                    href={siteSettings.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label="LinkedIn Profile"
                  >
                    <div className="p-3 rounded-full border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:bg-blue-50">
                      <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </a>
                )}
                
                {siteSettings?.socialLinks?.github && (
                  <a 
                    href={siteSettings.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label="GitHub Profile"
                  >
                    <div className="p-3 rounded-full border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:bg-gray-50">
                      <Github className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                    </div>
                  </a>
                )}
              </div>
            </div>
            
            {/* Right Column - Visual Content */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[4/5] max-w-lg mx-auto">
                {/* Floating role indicators */}
                <div className="absolute inset-0">
                  {roles.map((role, index) => {
                    const IconComponent = role.icon
                    return (
                      <div
                        key={index}
                        className={`absolute w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center transition-all duration-1000 border-2 border-blue-300 ${
                          currentRole === index 
                            ? 'scale-125 bg-gradient-to-br from-blue-200 to-blue-300 shadow-xl shadow-blue-300/25' 
                            : 'scale-100 opacity-80'
                        } ${
                          index === 0 ? 'top-8 right-8' : 
                          index === 1 ? 'bottom-8 left-8' : 
                          'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                        }`}
                      >
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                    )
                  })}
                </div>
                
                {/* Central Avatar/Visual */}
                <div className="absolute inset-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  {siteSettings?.professionalHeadshot ? (
                    <img
                      src={urlFor(siteSettings.professionalHeadshot).url()}
                      alt={siteSettings.professionalHeadshot.alt || "Ghondi Claude"}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-blue-300">
                          <Code className="w-16 h-16 text-blue-600" />
                        </div>
                        <p className="text-gray-600 text-sm">Portfolio Avatar</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Statement Modal */}
      <Modal
        isOpen={isArtistStatementOpen}
        onClose={() => setIsArtistStatementOpen(false)}
        title="Artist Statement"
      >
        <div className="space-y-4 text-gray-300">
          <p>
            My work exists at the intersection of three worlds: the emotional depth of fine art, 
            the systematic thinking of urban planning, and the limitless possibilities of technology.
          </p>
          <p>
            Each piece I create—whether it's a painting, an urban design proposal, or a digital 
            application—stems from a belief that beauty and functionality are not opposing forces, 
            but complementary aspects of meaningful creation.
          </p>
          <p>
            Through this multidisciplinary approach, I aim to create solutions that don't just 
            solve problems, but inspire and elevate the human experience.
          </p>
        </div>
      </Modal>

      {/* Technical Specifications Modal */}
      <Modal
        isOpen={isTechnicalSpecsOpen}
        onClose={() => setIsTechnicalSpecsOpen(false)}
        title="Technical Specifications"
      >
        <div className="space-y-6 text-gray-300">
          <div>
            <h3 className="text-accent-blue font-semibold mb-2">Frontend Technologies</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Next.js 14 with App Router</li>
              <li>TypeScript for type safety</li>
              <li>Tailwind CSS for styling</li>
              <li>Framer Motion for animations</li>
            </ul>
          </div>
          <div>
            <h3 className="text-accent-blue font-semibold mb-2">Content Management</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Sanity CMS for content management</li>
              <li>Dynamic content with real-time updates</li>
              <li>Image optimization and delivery</li>
            </ul>
          </div>
          <div>
            <h3 className="text-accent-blue font-semibold mb-2">Performance & SEO</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Server-side rendering (SSR)</li>
              <li>Optimized images with Next.js Image</li>
              <li>SEO-friendly meta tags and structure</li>
              <li>Core Web Vitals optimization</li>
            </ul>
          </div>
        </div>
      </Modal>
    </main>
  )
}
