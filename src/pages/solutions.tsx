import { createFileRoute } from '@tanstack/react-router'

import { Seo } from '@/components/features/global/seo.component'
import { LandingCta } from '@/components/features/landing/landing-cta.component'
import { LandingFooter } from '@/components/features/landing/landing-footer.component'
import { LandingNavbar } from '@/components/features/landing/landing-navbar.component'
import { FadeInView } from '@/components/ui/animated-container'
import { Button } from '@/components/ui/button'

function SolutionsPage() {
  return (
    <>
      <Seo
        title="Solutions — Ofluence"
        description="Discover how Ofluence helps brands, agencies, and creators run influencer marketing campaigns at scale."
        path="/solutions"
      />
      <LandingNavbar />
      <main>
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6 text-center md:px-8">
            <FadeInView>
              <p className="text-overline mb-3">Solutions</p>
              <h1 className="text-display-hero text-foreground">
                Built for how
                <br className="hidden sm:block" /> you actually work
              </h1>
              <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
                Whether you&apos;re a brand, agency, or creator — Ofluence adapts to your workflow
                with tools designed for your specific needs.
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <Button size="lg">Start free trial</Button>
                <Button variant="outline" size="lg">
                  Book a demo
                </Button>
              </div>
            </FadeInView>
          </div>
        </section>

        <LandingCta />
      </main>
      <LandingFooter />
    </>
  )
}

export const Route = createFileRoute('/solutions')({
  component: SolutionsPage,
})
