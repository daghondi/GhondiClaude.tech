import React from 'react'
import { getSiteSettings } from '@/sanity/utils'
import { SiteSettingsProvider } from '@/contexts/SiteSettingsContext'

interface SiteSettingsWrapperProps {
  children: React.ReactNode
}

export default async function SiteSettingsWrapper({ children }: SiteSettingsWrapperProps) {
  const siteSettings = await getSiteSettings()
  
  return (
    <SiteSettingsProvider siteSettings={siteSettings}>
      {children}  
    </SiteSettingsProvider>
  )
}
