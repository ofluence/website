import { useState } from 'react'

import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { cn } from '@/utils/global.utils'

import { Card, CardContent } from '@/components/ui/card'
import { LandingPageLayout } from '@/components/features/landing/landing-page-layout.component'

interface TocSection {
  id: string
  title: string
}

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  summary: string
  sections: TocSection[]
  children: React.ReactNode
}

function LegalPageLayout({
  title,
  lastUpdated,
  summary,
  sections,
  children,
}: LegalPageLayoutProps) {
  const [tocOpen, setTocOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.querySelector(`#${id}`)
    if (element) {
      const offset = 80
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setTocOpen(false)
  }

  return (
    <LandingPageLayout>
      <article className="mx-auto max-w-4xl px-6 py-20 md:px-8 md:py-28">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        <p className="text-muted-foreground mt-2 text-sm">Last updated: {lastUpdated}</p>

        {/* Summary box */}
        <Card className="from-primary/5 to-primary/2 mt-8 border-0 bg-gradient-to-br">
          <CardContent className="flex gap-3">
            <div className="text-primary mt-0.5 text-lg font-bold">&ldquo;</div>
            <p className="text-foreground/80 text-sm leading-relaxed">{summary}</p>
          </CardContent>
        </Card>

        {/* Mobile TOC */}
        <div className="mt-8 lg:hidden">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="border-border flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium"
          >
            Table of Contents
            <HugeiconsIcon icon={tocOpen ? ArrowUp01Icon : ArrowDown01Icon} className="size-4" />
          </button>
          {tocOpen && (
            <nav className="border-border mt-1 rounded-lg border px-4 py-3">
              <ol className="flex flex-col gap-2">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className="text-muted-foreground hover:text-primary text-left text-sm transition-colors"
                    >
                      {index + 1}. {section.title}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>

        {/* Desktop layout: sidebar TOC + content */}
        <div className="mt-12 flex gap-12">
          {/* Sticky sidebar TOC */}
          <nav className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24">
              <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
                Contents
              </p>
              <ol className="border-border flex flex-col gap-2 border-l pl-4">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        'text-muted-foreground hover:text-primary text-left text-sm transition-colors'
                      )}
                    >
                      {index + 1}. {section.title}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          {/* Content */}
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </article>
    </LandingPageLayout>
  )
}

export { LegalPageLayout }
export type { TocSection }
