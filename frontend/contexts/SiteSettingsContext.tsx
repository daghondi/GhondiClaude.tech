'use client'

import React from 'react'

// Create context for site settings
export const SiteSettingsContext = React.createContext<any>(null)

// Provider component
interface SiteSettingsProviderProps {
  siteSettings: any
  children: React.ReactNode
}

export const SiteSettingsProvider: React.FC<SiteSettingsProviderProps> = ({ 
  siteSettings, 
  children 
}) => {
  return (
    <SiteSettingsContext.Provider value={siteSettings}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

// Hook to use site settings
export const useSiteSettings = () => {
  const context = React.useContext(SiteSettingsContext)
  return context
}
