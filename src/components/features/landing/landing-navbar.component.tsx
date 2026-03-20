import { useEffect, useState } from 'react'

import { DashboardSquare01Icon, Menu01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@tanstack/react-router'

import { cn } from '@/utils/global.utils'

import { useScrollToSection } from '@/hooks/use-scroll-to-section'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { LANDING_NAV_LINKS } from '@/constants/landing.constants'

function NavLink({
  link,
  className,
  children,
}: {
  link: (typeof LANDING_NAV_LINKS)[number]
  className?: string
  children: React.ReactNode
}) {
  const scrollToSection = useScrollToSection()
  const isHash = link.href.startsWith('/#')

  if (isHash) {
    const sectionId = link.href.slice(2)
    return (
      <button className={className} onClick={() => scrollToSection(sectionId)}>
        {children}
      </button>
    )
  }

  // Non-hash links are valid TanStack Router paths (e.g. "/pricing")
  const path = link.href as '/'
  return (
    <Link to={path} className={className}>
      {children}
    </Link>
  )
}

function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300',
        scrolled ? 'glass shadow-soft-sm' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
            <HugeiconsIcon icon={DashboardSquare01Icon} size={16} />
          </div>
          <span className="font-display text-xl font-semibold">Ofluence</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {LANDING_NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              className="text-muted-foreground hover:text-foreground group relative text-sm font-medium transition-colors"
            >
              {link.label}
              <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" render={<Link to="/contact" />}>
            Contact
          </Button>
          <Button render={<Link to="/pricing" />}>Get Started</Button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <HugeiconsIcon icon={Menu01Icon} size={20} />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4 pt-4">
                {LANDING_NAV_LINKS.map((link) => (
                  <SheetClose key={link.href}>
                    <NavLink
                      link={link}
                      className="text-foreground text-base font-medium"
                    >
                      {link.label}
                    </NavLink>
                  </SheetClose>
                ))}
                <div className="border-border mt-4 flex flex-col gap-3 border-t pt-4">
                  <Button variant="outline" render={<Link to="/contact" />}>
                    Contact
                  </Button>
                  <Button render={<Link to="/pricing" />}>Get Started</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export { LandingNavbar }
