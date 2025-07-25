import React from 'react'
import { getSiteSettings } from '@/sanity/utils'
import ResponsiveNavigation from './ResponsiveNavigation'

export default async function ResponsiveNavigationWrapper() {
  const siteSettings = await getSiteSettings()
  
  return <ResponsiveNavigation siteSettings={siteSettings} />
}
