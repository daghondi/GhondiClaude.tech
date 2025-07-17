'use client'

import CursorFollower from '@/components/ui/CursorFollower'
import ResponsiveNavigation from '@/components/ui/ResponsiveNavigation'
import TopNavigation from '@/components/ui/TopNavigation'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageTransition from '@/components/ui/PageTransition'

export default function ClientComponents() {
  return (
    <>
      <PageTransition />
      <TopNavigation />
      <Breadcrumbs />
      <CursorFollower />
      <ResponsiveNavigation />
    </>
  )
}
