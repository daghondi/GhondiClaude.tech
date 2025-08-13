import React from 'react'
import { getSiteSettings } from '@/sanity/utils'
import Footer from './Footer'

export default async function FooterWrapper() {
  const siteSettings = await getSiteSettings()
  
  return <Footer siteSettings={siteSettings} />
}
