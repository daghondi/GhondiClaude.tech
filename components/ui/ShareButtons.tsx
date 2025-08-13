'use client'

import React from 'react'
import { Share2, Twitter, Linkedin, Copy } from 'lucide-react'

interface ShareButtonsProps {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const handleShare = (platform: string) => {
    const shareUrl = `https://ghondiclaude.me${url}`
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(shareUrl)
        // Could add a toast notification here
        break
    }
  }

  return (
    <div className="flex gap-4 mt-8">
      <span className="text-gray-400 flex items-center gap-2">
        <Share2 className="w-4 h-4" />
        Share:
      </span>
      <button
        onClick={() => handleShare('twitter')}
        className="text-gray-400 hover:text-accent-blue transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className="text-gray-400 hover:text-accent-blue transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleShare('copy')}
        className="text-gray-400 hover:text-accent-blue transition-colors"
        aria-label="Copy link"
      >
        <Copy className="w-5 h-5" />
      </button>
    </div>
  )
}
