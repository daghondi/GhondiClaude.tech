'use client'

import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/daghondi',
      icon: Github,
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
      color: 'hover:text-accent-blue'
    },
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
      color: 'hover:text-accent-blue'
    },
    {
      name: 'Email',
      href: 'mailto:contact@ghondiclaude.tech',
      icon: Mail,
      color: 'hover:text-accent-gold'
    }
  ]

  const footerSections = [
    {
      title: 'Portfolio',
      links: [
        { label: 'Fine Art', href: '/work/fine-art' },
        { label: 'Urban Planning', href: '/work/urban-planning' },
        { label: 'Tech Lab', href: '/work/tech-lab' },
        { label: 'All Work', href: '/work' }
      ]
    },
    {
      title: 'Content',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Urban Flow', href: '/blog/urban-flow' },
        { label: 'Art & Soul', href: '/blog/art-soul' },
        { label: 'Tech Explorations', href: '/blog/tech-explorations' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Collaborate', href: '/contact?type=collaboration' },
        { label: 'Speaking', href: '/contact?type=speaking' }
      ]
    }
  ]

  return (
    <footer className="bg-dark-secondary border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-magenta rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">GC</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                GhondiClaude
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Where Fine Art, Urban Planning, and Technology converge in a symphony of creativity. 
              Exploring the intersection of human vision and digital innovation.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Digital Nomad</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Available for Projects</span>
              </div>
            </div>
          </div>

          {/* Footer Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-heading font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links and Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`text-gray-400 ${social.color} transition-colors duration-200`}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Stay updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-dark-tertiary border border-white/20 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent text-sm w-48"
                />
                <button className="px-4 py-2 bg-accent-blue text-white rounded-r-md hover:bg-accent-blue/90 transition-colors duration-200 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © {currentYear} GhondiClaude.tech. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="mt-8 text-center">
          <blockquote className="text-gray-500 text-sm italic font-playfair">
            "The future belongs to those who believe in the beauty of their dreams, 
            and have the courage to build them into reality."
          </blockquote>
        </div>
      </div>
    </footer>
  )
}

export default Footer
