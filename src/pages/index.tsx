import { useEffect } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Seo } from '@/components/features/global/seo.component'
import { LandingCta } from '@/components/features/landing/landing-cta.component'
import { LandingFeatures } from '@/components/features/landing/landing-features.component'
import { LandingFooter } from '@/components/features/landing/landing-footer.component'
import { LandingHero } from '@/components/features/landing/landing-hero.component'
import { LandingHowItWorks } from '@/components/features/landing/landing-how-it-works.component'
import { LandingNavbar } from '@/components/features/landing/landing-navbar.component'
import { LandingSocialProof } from '@/components/features/landing/landing-social-proof.component'
import { LandingProductPreview } from '@/components/features/landing/product-preview/landing-product-preview.component'

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
    <>
      <Seo
        title="Influencer Marketing Platform"
        description="Ofluence is the all-in-one influencer marketing platform for brands, agencies, and creators. Discover creators, manage campaigns, track performance, and process payments."
        path="/"
      />
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingSocialProof />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingProductPreview />
        <LandingCta />
      </main>
      <LandingFooter />
    </>
  )
}

export const Route = createFileRoute('/')({
  component: IndexPage,
})
