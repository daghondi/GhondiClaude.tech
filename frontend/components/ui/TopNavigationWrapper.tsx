import React from 'react'
import { getSiteSettings } from '@/sanity/utils'
import TopNavigation from './TopNavigation'

export default async function TopNavigationWrapper() {
  const siteSettings = await getSiteSettings()
  
  return <TopNavigation siteSettings={siteSettings} />
}
