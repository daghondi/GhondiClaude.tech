'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { ZoomIn, Maximize2 } from 'lucide-react'

interface ImageLightboxProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  aspectRatio?: string
  showZoomIcon?: boolean
  priority?: boolean
}

export default function ImageLightbox({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  fill = false,
  aspectRatio = 'aspect-video',
  showZoomIcon = true,
  priority = false
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)

  const imageProps = {
    src,
    alt,
    className: `${className} cursor-pointer hover:scale-105 transition-transform duration-300`,
    onClick: () => setIsOpen(true),
    priority,
    ...(fill ? { fill: true } : { width: width || 600, height: height || 400 })
  }

  return (
    <>
      <div className={`relative group overflow-hidden ${aspectRatio}`}>
        <Image {...imageProps} />
        
        {showZoomIcon && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <Maximize2 className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
        
        {showZoomIcon && (
          <button 
            onClick={() => setIsOpen(true)}
            className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="View full size image"
          >
            <ZoomIn className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={[{ src, alt }]}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
        }}
      />
    </>
  )
}
