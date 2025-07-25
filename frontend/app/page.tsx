import { getSiteSettings } from '@/sanity/utils'
import HomePageClient from './components/HomePageClient'

export default async function HomePage() {
  const siteSettings = await getSiteSettings()

  return <HomePageClient siteSettings={siteSettings} />
}
