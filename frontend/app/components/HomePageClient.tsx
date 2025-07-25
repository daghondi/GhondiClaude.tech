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
    <main id="main-content" className="min-h-screen overflow-hidden pt-20">
      {/* Hero Section - Enhanced */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary" />
        
        {/* Animated geometric patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-2 h-2 bg-accent-blue rounded-full animate-ping" />
          <div className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full animate-pulse" />
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-accent-blue rounded-full animate-bounce" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/60 rounded-full animate-pulse delay-1000" />
        </div>
        
        {/* Floating orbs - minimal and sophisticated */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-blue/5 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-gradient-to-l from-white/3 to-transparent rounded-full blur-3xl animate-float animation-delay-2000" />
        </div>
        
        {/* Main Content Container */}
        <div className={`relative z-10 max-w-7xl mx-auto px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
              {/* Greeting */}
              <div className="space-y-2">
                <p className="text-lg md:text-xl text-accent-blue font-medium tracking-wide uppercase">
                  {siteSettings?.homepageExtraContent?.greetingText || "Hello, World!"}
                </p>
                
                {/* Name - Single Line */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-white to-accent-blue bg-clip-text text-transparent">
                    {siteSettings?.homepageContent?.heroTitle ? `I'm ${siteSettings.homepageContent.heroTitle}` : "I'm Ghondi Claude"}
                  </span>
                </h1>
              </div>
              
              {/* Professional Tags */}
              <div className="space-y-4">
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-sm md:text-base">
                  {(siteSettings?.homepageExtraContent?.professionalTags || ['Fine Artist', 'Urban Planner (MEng)', 'Tech-Preneur']).map((tag: string, index: number) => (
                    <span key={index} className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white font-medium hover:bg-accent-blue/20 hover:border-accent-blue/30 hover:text-accent-blue transition-all duration-300">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Subtitle */}
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
                  {siteSettings?.homepageExtraContent?.heroDescription ||
                    "Where Fine Art meets Urban Planning, and Technology bridges the creative divide. I create experiences that inspire, spaces that connect, and solutions that matter."
                  }
                </p>
                
                {/* Animated Role Display */}
                <div className="text-2xl md:text-3xl font-heading">
                  <span className="text-white">Currently: </span>
                  <span className="text-accent-blue animate-pulse">
                    {roles[currentRole].title}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/work" className="btn-primary group cursor-hover">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Explore My Work
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/about" className="btn-secondary group cursor-hover">
                  <Play className="w-5 h-5 mr-2" />
                  My Story
                </Link>
                <Link href="/contact" className="btn-ghost group cursor-hover">
                  {siteSettings?.globalContent?.commonButtons?.getInTouch || "Get in Touch"}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-6 pt-8">
                {siteSettings?.socialLinks?.linkedin && (
                  <a 
                    href={siteSettings.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label="LinkedIn Profile"
                  >
                    <div className="p-3 rounded-full border border-white/20 hover:border-accent-blue/50 transition-all duration-300 hover:bg-accent-blue/10">
                      <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-accent-blue transition-colors" />
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
                    <div className="p-3 rounded-full border border-white/20 hover:border-accent-blue/50 transition-all duration-300 hover:bg-accent-blue/10">
                      <Github className="w-5 h-5 text-gray-400 group-hover:text-accent-blue transition-colors" />
                    </div>
                  </a>
                )}
              </div>
            </div>
            
            {/* Right Column - Visual Content */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Floating role indicators */}
                <div className="absolute inset-0">
                  {roles.map((role, index) => {
                    const IconComponent = role.icon
                    return (
                      <div
                        key={index}
                        className={`absolute w-16 h-16 bg-gradient-to-br from-white/10 to-accent-blue/20 rounded-full flex items-center justify-center transition-all duration-1000 ${
                          currentRole === index 
                            ? 'scale-125 bg-accent-blue/30 shadow-2xl shadow-accent-blue/25' 
                            : 'scale-100 opacity-60'
                        } ${
                          index === 0 ? 'top-8 right-8' : 
                          index === 1 ? 'bottom-8 left-8' : 
                          'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                        }`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    )
                  })}
                </div>
                
                {/* Central Avatar/Visual */}
                <div className="absolute inset-4 bg-gradient-to-br from-white/5 to-accent-blue/10 rounded-2xl backdrop-blur-xl border border-white/10 overflow-hidden">
                  {siteSettings?.professionalHeadshot ? (
                    <img
                      src={urlFor(siteSettings.professionalHeadshot).url()}
                      alt={siteSettings.professionalHeadshot.alt || "Ghondi Claude"}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-white/20 to-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Code className="w-16 h-16 text-accent-blue" />
                        </div>
                        <p className="text-gray-400 text-sm">Portfolio Avatar</p>
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
