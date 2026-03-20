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

import { useLocaleContent } from '@/hooks/use-locale-content'
import { useScrollToSection } from '@/hooks/use-scroll-to-section'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/features/global/theme-toggle.component'

import { LANDING_FOOTER_LINKS } from '@/constants/landing.constants'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const scrollToSection = useScrollToSection()
  const isHash = href.startsWith('/#')
  const linkClass = 'text-sm text-footer-muted transition-colors hover:text-footer-fg'

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
        className="border-footer-border bg-footer-input-bg text-footer-fg placeholder:text-footer-input-placeholder focus:border-footer-accent flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none"
      />
      <Button type="submit">Subscribe</Button>
    </form>
  )
}

function LandingFooter() {
  const { compliance } = useLocaleContent()

  return (
    <footer className="bg-footer-bg text-footer-fg py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Newsletter */}
        <div className="border-footer-border mb-12 border-b pb-12">
          <div className="mx-auto max-w-md text-center">
            <h3 className="font-display text-xl font-semibold">Stay in the loop</h3>
            <p className="text-footer-muted mt-2 text-sm">
              Get the latest on influencer marketing trends, product updates, and industry insights.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="bg-footer-accent flex size-7 items-center justify-center rounded-md">
                <HugeiconsIcon icon={DashboardSquare01Icon} size={16} className="text-footer-bg" />
              </div>
              <span className="font-display text-xl font-semibold">Ofluence</span>
            </div>
            <p className="text-footer-muted mt-4 max-w-xs text-sm leading-relaxed">
              The modern influencer marketing platform for brands, agencies, and creators who want
              to do their best work together.
            </p>
            {/* Social icons with hover effects */}
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-muted hover:text-footer-fg transition-all duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <HugeiconsIcon icon={InstagramIcon} size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-muted hover:text-footer-fg transition-all duration-200 hover:scale-110"
                aria-label="YouTube"
              >
                <HugeiconsIcon icon={YoutubeIcon} size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-muted hover:text-footer-fg transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <HugeiconsIcon icon={Linkedin01Icon} size={20} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {LANDING_FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="text-footer-accent mb-4 text-sm font-semibold tracking-wider uppercase">
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
        <div className="border-footer-border mt-12 flex flex-wrap items-center justify-center gap-3 border-t pt-8">
          {compliance.map((badge) => (
            <span
              key={badge}
              className="border-footer-badge-border text-footer-badge-text inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
            >
              <HugeiconsIcon icon={SecurityCheckIcon} size={12} />
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-footer-dim text-sm">
            &copy; {new Date().getFullYear()} Ofluence. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <ThemeToggle className="text-footer-dim hover:text-footer-fg" side="top" />
            <button
              onClick={scrollToTop}
              className="text-footer-dim hover:text-footer-fg transition-colors"
              aria-label="Back to top"
            >
              <HugeiconsIcon icon={ArrowUp01Icon} size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { LandingFooter }
