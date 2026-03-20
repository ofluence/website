import { useEffect } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Seo } from '@/components/features/global/seo.component'
import { LandingCta } from '@/components/features/landing/landing-cta.component'
import { LandingFeatures } from '@/components/features/landing/landing-features.component'
import { LandingHero } from '@/components/features/landing/landing-hero.component'
import { LandingPageLayout } from '@/components/features/landing/landing-page-layout.component'
import { LandingPainPoints } from '@/components/features/landing/landing-pain-points.component'
import { LandingSocialProof } from '@/components/features/landing/landing-social-proof.component'

export const IndexPage = () => {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      setTimeout(() => {
        document.querySelector(`#${hash}`)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])

  return (
    <LandingPageLayout>
      <Seo
        title="Influencer Marketing Platform"
        description="Ofluence is the all-in-one influencer marketing platform for brands, agencies, and creators. Discover creators, manage campaigns, track performance, and process payments."
        path="/"
      />
      <LandingHero />
      <LandingPainPoints />
      <LandingFeatures />
      <LandingSocialProof />
      <LandingCta />
    </LandingPageLayout>
  )
}

export const Route = createFileRoute('/')({
  component: IndexPage,
})
