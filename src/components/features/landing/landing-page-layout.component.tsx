import { LandingFooter } from '@/components/features/landing/landing-footer.component'
import { LandingNavbar } from '@/components/features/landing/landing-navbar.component'

function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingNavbar />
      <main className="pt-16">{children}</main>
      <LandingFooter />
    </>
  )
}

export { LandingPageLayout }
