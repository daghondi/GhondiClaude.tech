import React from 'react'
import { getSiteSettings } from '@/sanity/utils'
import Header from './Header'

export default async function HeaderWrapper() {
  const siteSettings = await getSiteSettings()
  
  return <Header siteSettings={siteSettings} />
}
