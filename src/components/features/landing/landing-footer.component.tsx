import { useState } from 'react'

import {
  ArrowUp01Icon,
  DashboardSquare01Icon,
  InstagramIcon,
  Linkedin01Icon,
  SecurityCheckIcon,
  YoutubeIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'

import { useScrollToSection } from '@/hooks/use-scroll-to-section'

import { Button } from '@/components/ui/button'

import { LANDING_FOOTER_LINKS } from '@/constants/landing.constants'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const scrollToSection = useScrollToSection()
  const isHash = href.startsWith('/#')
  const linkClass =
    'text-sm text-[oklch(0.65_0.02_60)] transition-colors hover:text-[oklch(0.985_0.005_80)]'

  if (isHash) {
    const sectionId = href.slice(2)
    return (
      <button className={linkClass} onClick={() => scrollToSection(sectionId)}>
        {children}
      </button>
    )
  }

  return (
    <Link to={href} className={linkClass}>
      {children}
    </Link>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!email || !email.includes('@') || !email.includes('.')) {
      toast.error('Please enter a valid email address')
      return
    }
    toast.success('Subscribed!', { description: "You'll hear from us soon." })
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        className="flex-1 rounded-md border border-[oklch(1_0_0/0.1)] bg-[oklch(0.2_0.01_60)] px-3 py-2 text-sm text-[oklch(0.985_0.005_80)] placeholder:text-[oklch(0.45_0.02_60)] focus:border-[oklch(0.72_0.1_25)] focus:outline-none"
      />
      <Button type="submit">Subscribe</Button>
    </form>
  )
}

function LandingFooter() {
  return (
    <footer className="bg-[oklch(0.15_0.01_60)] py-16 text-[oklch(0.985_0.005_80)]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Newsletter */}
        <div className="mb-12 border-b border-[oklch(1_0_0/0.1)] pb-12">
          <div className="mx-auto max-w-md text-center">
            <h3 className="font-display text-xl font-semibold">Stay in the loop</h3>
            <p className="mt-2 text-sm text-[oklch(0.65_0.02_60)]">
              Get the latest on influencer marketing trends, product updates, and industry insights.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-[oklch(0.72_0.1_25)]">
                <HugeiconsIcon
                  icon={DashboardSquare01Icon}
                  size={16}
                  className="text-[oklch(0.15_0.01_60)]"
                />
              </div>
              <span className="font-display text-xl font-semibold">Ofluence</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[oklch(0.65_0.02_60)]">
              The modern influencer marketing platform for brands, agencies, and creators who want
              to do their best work together.
            </p>
            {/* Social icons with hover effects */}
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(0.65_0.02_60)] transition-all duration-200 hover:scale-110 hover:text-[oklch(0.985_0.005_80)]"
                aria-label="Instagram"
              >
                <HugeiconsIcon icon={InstagramIcon} size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(0.65_0.02_60)] transition-all duration-200 hover:scale-110 hover:text-[oklch(0.985_0.005_80)]"
                aria-label="YouTube"
              >
                <HugeiconsIcon icon={YoutubeIcon} size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(0.65_0.02_60)] transition-all duration-200 hover:scale-110 hover:text-[oklch(0.985_0.005_80)]"
                aria-label="LinkedIn"
              >
                <HugeiconsIcon icon={Linkedin01Icon} size={20} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {LANDING_FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-[oklch(0.72_0.1_25)] uppercase">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-t border-[oklch(1_0_0/0.1)] pt-8">
          {['GDPR Compliant', 'ISO 27001', 'SOC 2'].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(1_0_0/0.08)] px-3 py-1 text-xs text-[oklch(0.55_0.02_60)]"
            >
              <HugeiconsIcon icon={SecurityCheckIcon} size={12} />
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-[oklch(0.5_0.02_60)]">
            &copy; {new Date().getFullYear()} Ofluence. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="text-[oklch(0.5_0.02_60)] transition-colors hover:text-[oklch(0.985_0.005_80)]"
            aria-label="Back to top"
          >
            <HugeiconsIcon icon={ArrowUp01Icon} size={20} />
          </button>
        </div>
      </div>
    </footer>
  )
}

export { LandingFooter }
