import { useEffect } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { seo } from '@/utils/seo.utils'

import { LandingCta } from '@/components/features/landing/landing-cta.component'
import { LandingFeatures } from '@/components/features/landing/landing-features.component'
import { LandingHero } from '@/components/features/landing/landing-hero.component'
import { LandingPageLayout } from '@/components/features/landing/landing-page-layout.component'
import { LandingPainPoints } from '@/components/features/landing/landing-pain-points.component'
import { LandingSocialProof } from '@/components/features/landing/landing-social-proof.component'

const INDEX_DESCRIPTION =
  'Ofluence is the all-in-one influencer marketing platform for brands, agencies, and creators. Discover creators, manage campaigns, track performance, and process payments.'

function IndexPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1)
      if (hash) {
        setTimeout(() => {
          document.querySelector(`#${hash}`)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [])

  return (
    <LandingPageLayout>
      <LandingHero />
      <LandingPainPoints />
      <LandingFeatures />
      <LandingSocialProof />
      <LandingCta />
    </LandingPageLayout>
  )
}

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Influencer Marketing Platform — Ofluence' },
      ...seo({
        title: 'Influencer Marketing Platform — Ofluence',
        description: INDEX_DESCRIPTION,
        path: '/',
      }),
    ],
    links: [{ rel: 'canonical', href: 'https://ofluence.ai/' }],
  }),
  component: IndexPage,
})
