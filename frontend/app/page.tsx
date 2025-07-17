'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Play, Sparkles, Layers, Code, Palette } from 'lucide-react'

// Note: For now we'll comment out metadata since we're using 'use client'
// TODO: Move metadata to layout.tsx or use a separate metadata function
// export const metadata: Metadata = {
//   title: 'GhondiClaude.tech | Multi-Dimensional Creative Portfolio',
//   description: 'Welcome to Ghondi Claude\'s universe - where Fine Art, Urban Planning, and Technology converge in a symphony of creativity.',
// }

export default function HomePage() {
  const [currentRole, setCurrentRole] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  const roles = [
    { title: "Fine Artist", color: "text-accent-blue", icon: Palette },
    { title: "Urban Planner", color: "text-accent-magenta", icon: Layers },
    { title: "Tech Innovator", color: "text-accent-gold", icon: Code }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      {/* Hero Section - Enhanced */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary" />
        
        {/* Animated geometric patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-2 h-2 bg-accent-blue rounded-full animate-ping" />
          <div className="absolute top-40 right-32 w-1 h-1 bg-accent-magenta rounded-full animate-pulse" />
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-accent-gold rounded-full animate-bounce" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent-indigo rounded-full animate-pulse delay-1000" />
        </div>
        
        {/* Floating orbs - subtle */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-blue/10 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-gradient-to-l from-accent-magenta/8 to-transparent rounded-full blur-3xl animate-float animation-delay-2000" />
        </div>
        
        {/* Main Content Container */}
        <div className={`relative z-10 max-w-7xl mx-auto px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
              {/* Greeting */}
              <div className="space-y-2">
                <p className="text-lg md:text-xl text-accent-blue font-medium tracking-wide uppercase">
                  Hello, World!
                </p>
                
                {/* Name - Single Line */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight">
                  <span className="text-gradient bg-gradient-to-r from-accent-blue via-accent-magenta to-accent-gold bg-clip-text text-transparent animate-gradient">
                    I'm Ghondi Claude
                  </span>
                </h1>
              </div>
              
              {/* Professional Tags */}
              <div className="space-y-4">
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-sm md:text-base">
                  <span className="px-4 py-2 bg-accent-blue/20 border border-accent-blue/30 rounded-full text-accent-blue font-medium">
                    Fine Artist
                  </span>
                  <span className="px-4 py-2 bg-accent-magenta/20 border border-accent-magenta/30 rounded-full text-accent-magenta font-medium">
                    Urban Planner (MEng)
                  </span>
                  <span className="px-4 py-2 bg-accent-gold/20 border border-accent-gold/30 rounded-full text-accent-gold font-medium">
                    Tech Innovator
                  </span>
                </div>
              </div>
              
              {/* Professional Introduction */}
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                  I'm a multi-dimensional creative professional who bridges the worlds of 
                  <span className="text-accent-blue font-semibold"> artistic expression</span>, 
                  <span className="text-accent-magenta font-semibold"> urban design</span>, and 
                  <span className="text-accent-gold font-semibold"> technological innovation</span>. 
                  My unique perspective emerges at the intersection of creativity, spatial planning, and digital exploration.
                </p>
                
                <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl">
                  With a Master's in Engineering and a passion for both traditional and digital arts, 
                  I create solutions that are not just functional, but beautifully human-centered.
                </p>
              </div>
              
              {/* Dynamic role display - keeping the animation */}
              <div className="flex items-center justify-center lg:justify-start">
                <div className="text-lg md:text-xl font-lora">
                  <span className="text-gray-300">Currently focusing as a </span>
                  <span className={`font-bold transition-all duration-500 ${roles[currentRole].color}`}>
                    {roles[currentRole].title}
                  </span>
                </div>
              </div>
              
              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/work" className="btn-primary group cursor-hover">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Explore My Work
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/about" className="btn-secondary group cursor-hover">
                  <Play className="w-5 h-5 mr-2" />
                  My Journey
                </Link>
                <Link href="/contact" className="btn-ghost group cursor-hover">
                  Let's Collaborate
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Right Column - Professional Headshot */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative group">
                {/* Background decorative elements */}
                <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-accent-blue/20 to-accent-magenta/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-tl from-accent-gold/20 to-accent-indigo/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                
                {/* Image Container */}
                <div className="relative w-80 h-96 md:w-96 md:h-[28rem] bg-gradient-to-br from-accent-blue/10 to-accent-magenta/10 rounded-2xl border border-white/10 overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-2xl">
                  {/* Placeholder for professional headshot */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 via-accent-magenta/20 to-accent-gold/20 flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-accent-blue to-accent-magenta rounded-full flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-white animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-white font-medium">Professional Headshot</p>
                        <p className="text-gray-300 text-sm">Coming Soon</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Uncomment and replace with your actual headshot */}
                  {/* <img 
                    src="/images/ghondi-claude-headshot.jpg" 
                    alt="Ghondi Claude - Professional Headshot"
                    className="w-full h-full object-cover object-center"
                  /> */}
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/20 via-transparent to-transparent" />
                </div>
                
                {/* Floating accent elements */}
                <div className="absolute -top-6 -right-6 w-4 h-4 bg-accent-blue rounded-full animate-bounce" />
                <div className="absolute -bottom-6 -left-6 w-3 h-3 bg-accent-magenta rounded-full animate-pulse" />
                <div className="absolute top-1/2 -left-8 w-2 h-2 bg-accent-gold rounded-full animate-ping" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent-blue/50 rounded-full flex justify-center cursor-pointer hover:border-accent-blue transition-colors">
            <div className="w-1 h-3 bg-accent-blue/70 rounded-full mt-2 animate-pulse" />
          </div>
          <p className="text-sm text-gray-400 mt-2">Scroll to explore</p>
        </div>
      </section>
      
      {/* Enhanced Navigation Cards Section */}
      <section id="about" className="section bg-gradient-to-b from-dark-secondary/50 to-dark-primary/50 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-6 h-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="border border-white/10" />
            ))}
          </div>
        </div>
        
        <div className="section-container relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading mb-6">
              <span className="text-gradient bg-gradient-to-r from-accent-blue to-accent-magenta bg-clip-text text-transparent">
                Three Worlds, One Vision
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore the convergence of creativity, planning, and technology through my interdisciplinary approach
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fine Art - Enhanced */}
            <Link href="/work?category=art" className="group cursor-hover">
              <div className="card-hover relative overflow-hidden">
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon container with animation */}
                <div className="relative h-64 bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 rounded-lg mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Palette className="w-20 h-20 text-accent-blue group-hover:animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent-blue/10 group-hover:from-accent-blue/10 transition-all duration-300" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-heading mb-4 group-hover:text-accent-blue transition-colors duration-300">
                    Fine Art
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Explore paintings, mixed media, and artistic expressions that capture the essence of human experience through color, form, and emotion.
                  </p>
                  <div className="flex items-center text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">View Gallery</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Urban Planning - Enhanced */}
            <Link href="/work?category=urban" className="group cursor-hover">
              <div className="card-hover relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-magenta/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-64 bg-gradient-to-br from-accent-magenta/20 to-accent-magenta/5 rounded-lg mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Layers className="w-20 h-20 text-accent-magenta group-hover:animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent-magenta/10 group-hover:from-accent-magenta/10 transition-all duration-300" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-heading mb-4 group-hover:text-accent-magenta transition-colors duration-300">
                    Urban Planning
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Discover innovative approaches to city design, sustainable development, and community-centered planning solutions.
                  </p>
                  <div className="flex items-center text-accent-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">View Projects</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Tech Lab - Enhanced */}
            <Link href="/work?category=tech" className="group cursor-hover">
              <div className="card-hover relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-64 bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 rounded-lg mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Code className="w-20 h-20 text-accent-gold group-hover:animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent-gold/10 group-hover:from-accent-gold/10 transition-all duration-300" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-heading mb-4 group-hover:text-accent-gold transition-colors duration-300">
                    Tech Innovation
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Dive into AI experiments, AR projects, and cybersecurity innovations that shape the future of digital interaction.
                  </p>
                  <div className="flex items-center text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Explore Lab</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Work - Enhanced */}
      <section id="work" className="section relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-blue/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent-magenta/5 to-transparent" />
        
        <div className="section-container relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-accent-gold" />
              <span className="text-accent-gold font-medium tracking-wider uppercase text-sm">Featured Work</span>
              <Sparkles className="w-6 h-6 text-accent-gold" />
            </div>
            <h2 className="text-5xl lg:text-6xl font-heading mb-6">
              <span className="text-gradient bg-gradient-to-r from-accent-blue via-accent-magenta to-accent-gold bg-clip-text text-transparent">
                Where Worlds Collide
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A curated selection of projects that showcase the intersection of art, planning, and technology—
              where each discipline enhances and amplifies the others.
            </p>
          </div>
          
          <div className="space-y-24">
            {/* Project 1 - Enhanced */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-blue to-accent-magenta rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">01</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-accent-blue to-transparent flex-1" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-heading font-bold">
                    Digital Urban Canvas
                  </h3>
                  <p className="text-accent-blue font-medium">Interactive Data Visualization • Mixed Media Art</p>
                </div>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  An immersive installation that transforms urban data streams into living, breathing art. 
                  Real-time city metrics—traffic patterns, energy consumption, social media sentiment—
                  are interpreted through generative algorithms that paint the pulse of the city in light and color.
                </p>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium">Data Art</span>
                    <span className="px-4 py-2 bg-accent-magenta/20 text-accent-magenta rounded-full text-sm font-medium">Urban Analytics</span>
                    <span className="px-4 py-2 bg-accent-gold/20 text-accent-gold rounded-full text-sm font-medium">Generative AI</span>
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/work/digital-urban-canvas" className="btn-primary group">
                      <Play className="w-4 h-4 mr-2" />
                      View Project
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="btn-ghost group">
                      <Layers className="w-4 h-4 mr-2" />
                      Case Study
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="relative group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-accent-blue/20 via-accent-magenta/20 to-accent-gold/20 rounded-2xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-dark-tertiary/80 to-dark-quaternary/80" />
                      <div className="relative text-center">
                        <Play className="w-16 h-16 text-white mb-4 mx-auto group-hover:scale-110 transition-transform" />
                        <p className="text-white font-medium">Interactive Demo</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-magenta/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
            
            {/* Project 2 - Enhanced */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-magenta to-accent-gold rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">02</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-accent-magenta to-transparent flex-1" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-heading font-bold">
                    Smart City Symphony
                  </h3>
                  <p className="text-accent-magenta font-medium">Urban Planning • AI Systems • Community Design</p>
                </div>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  A comprehensive urban planning framework that orchestrates AI-driven traffic optimization 
                  with community-centered design principles. This project reimagines how technology can serve 
                  human needs while preserving the cultural fabric of neighborhoods.
                </p>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-accent-magenta/20 text-accent-magenta rounded-full text-sm font-medium">Smart Cities</span>
                    <span className="px-4 py-2 bg-accent-gold/20 text-accent-gold rounded-full text-sm font-medium">AI Planning</span>
                    <span className="px-4 py-2 bg-accent-indigo/20 text-accent-indigo rounded-full text-sm font-medium">Community Focus</span>
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/work/smart-city-symphony" className="btn-primary group">
                      <Layers className="w-4 h-4 mr-2" />
                      Explore Plan
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="btn-ghost group">
                      <Code className="w-4 h-4 mr-2" />
                      Technical Specs
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="lg:order-2">
                <div className="relative group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-accent-magenta/20 via-accent-gold/20 to-accent-indigo/20 rounded-2xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-dark-tertiary/80 to-dark-quaternary/80" />
                      <div className="relative text-center">
                        <Layers className="w-16 h-16 text-white mb-4 mx-auto group-hover:scale-110 transition-transform" />
                        <p className="text-white font-medium">3D Visualization</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-magenta/20 to-accent-gold/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </div>
          
          {/* View All Projects CTA */}
          <div className="text-center mt-20">
            <Link href="/work" className="btn-primary btn-lg group">
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-gray-400 mt-4">
              Discover more interdisciplinary projects and experiments
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy & Vision Section */}
      <section id="blog" className="section bg-gradient-to-b from-dark-secondary/30 to-dark-primary relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-accent-blue rounded-full animate-ping" />
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-accent-magenta rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/6 w-3 h-3 bg-accent-gold rounded-full animate-bounce" />
        </div>
        
        <div className="section-container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold">
                <span className="text-gradient bg-gradient-to-r from-accent-blue to-accent-magenta bg-clip-text text-transparent">
                  Bridging Worlds, Building Futures
                </span>
              </h2>
              
              <div className="text-xl lg:text-2xl text-gray-300 leading-relaxed space-y-6">
                <p>
                  In a world of increasing specialization, I believe the most profound innovations 
                  emerge at the <span className="text-accent-blue font-semibold">intersections</span>.
                </p>
                <p>
                  Where the intuitive flow of artistic creation meets the systematic rigor of urban planning. 
                  Where human-centered design principles guide technological advancement. 
                  Where beauty and function unite to create spaces that don&apos;t just work—they <span className="text-accent-magenta font-semibold">inspire</span>.
                </p>
              </div>
              
              <div className="pt-8">
                <blockquote className="text-2xl lg:text-3xl font-playfair italic text-gray-200 relative">
                  <span className="text-6xl text-accent-gold/30 absolute -top-8 -left-4">&ldquo;</span>
                  The future belongs to those who can see the poetry in data, 
                  the artistry in algorithms, and the humanity in every line of code.
                  <span className="text-6xl text-accent-gold/30 absolute -bottom-4 -right-4">&rdquo;</span>
                </blockquote>
                <p className="text-accent-gold font-medium mt-6">— Ghondi Claude</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 via-accent-magenta/10 to-accent-gold/10" />
        <div className="absolute inset-0">
          <div className="grid grid-cols-8 h-full opacity-5">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>
        </div>
        
        <div className="section-container relative">
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-heading font-bold">
                <span className="text-white">Ready to </span>
                <span className="text-gradient bg-gradient-to-r from-accent-blue via-accent-magenta to-accent-gold bg-clip-text text-transparent">
                  Collaborate?
                </span>
              </h2>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Whether you&apos;re looking to commission artwork, need urban planning consultation, 
                or want to explore the frontiers of creative technology—let&apos;s create something extraordinary together.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact" className="btn-primary btn-lg group">
                <Sparkles className="w-6 h-6 mr-3 group-hover:animate-spin" />
                Start a Project
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about" className="btn-secondary btn-lg group">
                <Play className="w-5 h-5 mr-2" />
                Learn My Story
              </Link>
              <Link href="/blog" className="btn-ghost btn-lg group">
                Read Insights
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="pt-8">
              <p className="text-gray-400 text-lg">
                Join the journey at the intersection of art, planning, and technology
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
