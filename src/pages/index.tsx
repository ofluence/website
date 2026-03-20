import { useEffect } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { LandingCta } from '@/components/features/landing/landing-cta.component'
import { LandingFeatures } from '@/components/features/landing/landing-features.component'
import { LandingFooter } from '@/components/features/landing/landing-footer.component'
import { LandingHero } from '@/components/features/landing/landing-hero.component'
import { LandingHowItWorks } from '@/components/features/landing/landing-how-it-works.component'
import { LandingNavbar } from '@/components/features/landing/landing-navbar.component'
import { LandingProductPreview } from '@/components/features/landing/product-preview/landing-product-preview.component'
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
    <>
      <title>Ofluence — Influencer Marketing Platform</title>
      <meta
        name="description"
        content="Ofluence is the all-in-one influencer marketing platform for brands, agencies, and creators. Discover creators, manage campaigns, track performance, and process payments."
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
