import type { Metadata } from 'next'
import { Inter, Playfair_Display, Lora, Raleway } from 'next/font/google'
import './globals.css'
import CursorFollower from '@/components/ui/CursorFollower'
import Taskbar from '@/components/ui/Taskbar'

// Font configurations
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const raleway = Raleway({ 
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'GhondiClaude.tech | Multi-Dimensional Creative Portfolio',
    template: '%s | GhondiClaude.tech'
  },
  description: 'Ghondi Claude\'s unique trinity of expertise: Fine Artist, Urban Planner (MEng), and Tech Enthusiast. A sophisticated portfolio showcasing the intersection of creativity, urban vision, and technological exploration.',
  keywords: [
    'Ghondi Claude',
    'Fine Art',
    'Urban Planning',
    'Technology',
    'Portfolio',
    'Creative Professional',
    'Artist',
    'Urban Designer',
    'Tech Enthusiast',
    'MEng',
    'Multidisciplinary'
  ],
  authors: [{ name: 'Ghondi Claude' }],
  creator: 'Ghondi Claude',
  publisher: 'GhondiClaude.tech',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ghondiclaude.tech',
    siteName: 'GhondiClaude.tech',
    title: 'GhondiClaude.tech | Multi-Dimensional Creative Portfolio',
    description: 'Explore the unique intersection of Fine Art, Urban Planning, and Technology through Ghondi Claude\'s creative portfolio.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GhondiClaude.tech - Multi-Dimensional Creative Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GhondiClaude.tech | Multi-Dimensional Creative Portfolio',
    description: 'Explore the unique intersection of Fine Art, Urban Planning, and Technology.',
    images: ['/og-image.jpg'],
    creator: '@ghondiclaude',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  category: 'portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfair.variable} ${lora.variable} ${raleway.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" 
          as="style" 
        />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap" 
          as="style" 
        />
        
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#1E1E1E" />
        <meta name="msapplication-TileColor" content="#1E1E1E" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://ghondiclaude.tech" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className="bg-dark-primary text-white font-raleway antialiased">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent-blue text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        {/* Main application */}
        <div id="root" className="relative">
          {children}
          
          {/* Interactive UI Components */}
          <CursorFollower />
          <Taskbar />
        </div>
        
        {/* Scripts for analytics and other third-party services */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics or other analytics scripts can be added here */}
          </>
        )}
      </body>
    </html>
  )
}
