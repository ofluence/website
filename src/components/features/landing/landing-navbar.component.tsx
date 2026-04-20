import { useEffect, useState } from 'react'

import { ArrowRight01Icon, Menu01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link, useLocation } from '@tanstack/react-router'
import { m } from 'motion/react'

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

function useActiveNavLink() {
  const location = useLocation()
  const pathname = location.pathname
  const [visibleSection, setVisibleSection] = useState<string | null>(null)

  // Reset visible section when route changes (React "store previous value" pattern)
  const [previousPathname, setPreviousPathname] = useState(pathname)
  if (previousPathname !== pathname) {
    setPreviousPathname(pathname)
    setVisibleSection(null)
  }

  useEffect(() => {
    const sectionIds = LANDING_NAV_LINKS.filter((l) => l.href.startsWith('/#')).map((l) =>
      l.href.slice(2)
    )
    const elements = sectionIds.flatMap((id) => {
      const element = document.querySelector(`#${id}`)
      return element ? [element] : []
    })

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id)
          } else {
            setVisibleSection((current) => (entry.target.id === current ? null : current))
          }
        }
      },
      { threshold: 0.3 }
    )

    for (const element of elements) observer.observe(element)
    return () => observer.disconnect()
  }, [pathname])

  return (href: string) => {
    if (href.startsWith('/#')) {
      const sectionId = href.slice(2)
      return visibleSection === sectionId
    }
    return pathname === href
  }
}

function NavLink({
  link,
  className,
  activeClassName,
  children,
}: {
  link: (typeof LANDING_NAV_LINKS)[number]
  className?: string
  activeClassName?: string
  children: React.ReactNode
}) {
  const scrollToSection = useScrollToSection()
  const isActive = useActiveNavLink()
  const active = isActive(link.href)

  if (link.href.startsWith('/#')) {
    const sectionId = link.href.slice(2)
    return (
      <button
        className={cn(className, active && activeClassName)}
        onClick={() => scrollToSection(sectionId)}
      >
        {children}
      </button>
    )
  }

  const path = link.href as '/'
  return (
    <Link to={path} className={cn(className, active && activeClassName)}>
      {children}
    </Link>
  )
}

const navSpring = { type: 'spring' as const, stiffness: 300, damping: 30 }

function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 md:px-0">
      <m.div
        className="mx-auto h-16"
        initial={false}
        animate={{
          maxWidth: scrolled ? '64rem' : '80rem',
          marginTop: scrolled ? 12 : 0,
          borderRadius: scrolled ? 16 : 0,
          backgroundColor: scrolled ? 'var(--color-card)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
          borderColor: scrolled ? 'var(--color-border)' : 'transparent',
          boxShadow: scrolled
            ? '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)'
            : '0 0 0 0 transparent',
        }}
        style={{
          borderWidth: 1,
          borderStyle: 'solid',
        }}
        transition={navSpring}
      >
        <div className="flex h-full items-center justify-between px-6 md:px-8">
          {/* Logo + Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/logos/logo-192x192.png"
              alt="Ofluence"
              width={28}
              height={28}
              decoding="async"
              className="size-7"
            />
            <span className="font-display text-xl font-bold">Ofluence</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {LANDING_NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                link={link}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                activeClassName="text-primary"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <Button size="sm" render={<a href={`${import.meta.env.VITE_APP_URL}/login`} />}>
              Get started
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" data-icon="inline-end" />
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
                  <SheetTitle className="flex items-center gap-2">
                    <img
                      src="/logos/logo-192x192.png"
                      alt="Ofluence"
                      width={28}
                      height={28}
                      decoding="async"
                      className="size-7"
                    />
                    <span className="font-display text-xl font-bold">Ofluence</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8 px-6 pt-12">
                  {LANDING_NAV_LINKS.map((link) => (
                    <SheetClose key={link.href}>
                      <NavLink
                        link={link}
                        className="font-display text-foreground/60 text-2xl transition-colors sm:text-3xl"
                        activeClassName="text-primary"
                      >
                        {link.label}
                      </NavLink>
                    </SheetClose>
                  ))}
                  <div className="border-border mt-4 border-t pt-4">
                    <div className="flex flex-col gap-4">
                      <Button render={<a href={`${import.meta.env.VITE_APP_URL}/login`} />}>
                        Get started
                        <HugeiconsIcon
                          icon={ArrowRight01Icon}
                          className="size-4"
                          data-icon="inline-end"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </m.div>
    </nav>
  )
}

export { LandingNavbar }
