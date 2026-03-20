import { useEffect, useState } from 'react'

import { ArrowRight01Icon, Menu01Icon } from '@hugeicons/core-free-icons'
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
        'fixed z-50 h-16 transition-all duration-500',
        scrolled
          ? 'top-3 inset-x-3 md:inset-x-auto md:left-1/2 md:w-full md:max-w-5xl md:-translate-x-1/2 bg-card/90 backdrop-blur-xl border border-border/60 rounded-2xl shadow-soft'
          : 'inset-x-0 top-0 bg-transparent'
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-8">
        {/* Wordmark */}
        <Link to="/" className="font-display text-xl font-bold">
          Ofluence
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {LANDING_NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/contact"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Contact
          </Link>
          <Button size="sm" render={<Link to="/pricing" />}>
            Get started
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="size-4"
              data-icon="inline-end"
            />
          </Button>
        </div>

        {/* Mobile — fullscreen overlay menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <HugeiconsIcon icon={Menu01Icon} size={20} />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-full">
              <SheetHeader>
                <SheetTitle className="font-display text-xl font-bold">Ofluence</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8 px-6 pt-12">
                {LANDING_NAV_LINKS.map((link) => (
                  <SheetClose key={link.href}>
                    <NavLink
                      link={link}
                      className="font-display text-foreground text-3xl transition-colors"
                    >
                      {link.label}
                    </NavLink>
                  </SheetClose>
                ))}
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex flex-col gap-4">
                    <Link
                      to="/contact"
                      className="text-muted-foreground text-sm font-medium"
                    >
                      Contact
                    </Link>
                    <Button render={<Link to="/pricing" />}>
                      Get started
                      <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" data-icon="inline-end" />
                    </Button>
                  </div>
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
