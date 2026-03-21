import { useState } from 'react'

import {
  ArrowUp01Icon,
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

import { ThemeToggle } from '@/components/features/global/theme-toggle.component'

import { LANDING_FOOTER_LINKS } from '@/constants/landing.constants'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const scrollToSection = useScrollToSection()
  const isHash = href.startsWith('/#')
  const linkClass =
    'text-xs font-medium tracking-widest uppercase text-muted-foreground transition-colors hover:text-foreground'

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
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-3">
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="your@email.com"
        className="border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary border-b bg-transparent px-0 py-2 text-sm transition-colors outline-none sm:flex-1"
      />
      <button
        type="submit"
        className="text-muted-foreground hover:text-foreground self-start text-xs font-medium tracking-widest uppercase transition-colors"
      >
        Subscribe
      </button>
    </form>
  )
}

function LandingFooter() {
  const { compliance } = useLocaleContent()

  return (
    <footer className="bg-card text-foreground py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Editorial masthead */}
        <div className="border-border mb-16 border-b pb-16">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <img src="/logos/logo-192x192.png" alt="Ofluence" className="size-10" />
                <span className="font-display text-4xl font-bold md:text-5xl">Ofluence</span>
              </div>
              <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-relaxed">
                Helping brands and creators build partnerships that drive real results.
              </p>
              {/* Social icons — static, muted */}
              <div className="mt-6 flex gap-5">
                <button
                  className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <HugeiconsIcon icon={InstagramIcon} size={18} />
                </button>
                <button
                  className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  aria-label="YouTube"
                >
                  <HugeiconsIcon icon={YoutubeIcon} size={18} />
                </button>
                <button
                  className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <HugeiconsIcon icon={Linkedin01Icon} size={18} />
                </button>
              </div>
            </div>
            {/* Newsletter */}
            <div>
              <p className="font-display text-lg font-medium">Stay informed.</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Product updates, industry insights, and the occasional opinion.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          {LANDING_FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="text-primary mb-5 text-xs font-medium tracking-[0.2em] uppercase">
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
        <div className="border-border mt-16 flex flex-wrap items-center justify-center gap-4 border-t pt-8">
          {compliance.map((badge) => (
            <span
              key={badge}
              className="text-muted-foreground/60 inline-flex items-center gap-1 text-[10px] font-medium tracking-widest uppercase"
            >
              <HugeiconsIcon icon={SecurityCheckIcon} size={10} />
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-border mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
          <p className="text-muted-foreground/50 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Ofluence
          </p>
          <div className="flex items-center gap-3">
            <ThemeToggle className="text-muted-foreground/50 hover:text-foreground" side="top" />
            <button
              onClick={scrollToTop}
              className="text-muted-foreground/50 hover:text-foreground transition-colors"
              aria-label="Back to top"
            >
              <HugeiconsIcon icon={ArrowUp01Icon} size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { LandingFooter }
