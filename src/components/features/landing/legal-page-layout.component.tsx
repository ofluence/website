import { useEffect, useState } from 'react'

import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { cn } from '@/utils/global.utils'

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

function useActiveTocSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.querySelector(`#${id}`))
      .filter(Boolean) as Element[]

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first section that is intersecting (topmost visible)
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .toSorted((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    for (const element of elements) observer.observe(element)
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}

function LegalPageLayout({
  title,
  lastUpdated,
  summary,
  sections,
  children,
}: LegalPageLayoutProps) {
  const [tocOpen, setTocOpen] = useState(false)
  const sectionIds = sections.map((s) => s.id)
  const activeId = useActiveTocSection(sectionIds)

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
      <article className="mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-28">
        <h1 className="text-display-section">{title}</h1>
        <p className="text-muted-foreground mt-2 text-xs font-medium tracking-widest uppercase">
          Last updated: {lastUpdated}
        </p>

        {/* Summary — editorial pull quote style */}
        <div className="border-primary mt-10 border-l-2 py-1 pl-6">
          <p className="text-foreground/80 text-sm leading-relaxed">{summary}</p>
        </div>

        {/* Mobile TOC */}
        <div className="mt-10 lg:hidden">
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
                      className={cn(
                        'text-left text-sm transition-colors',
                        activeId === section.id
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
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
        <div className="mt-16 flex gap-16">
          {/* Sticky sidebar TOC — editorial numbering */}
          <nav className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24">
              <p className="text-muted-foreground mb-4 text-xs font-medium tracking-[0.2em] uppercase">
                Contents
              </p>
              <ol className="border-border relative flex flex-col gap-2.5 border-l pl-4">
                {sections.map((section, index) => (
                  <li key={section.id} className="relative">
                    {activeId === section.id && (
                      <span className="bg-primary absolute top-0 -left-4.25 h-full w-0.5" />
                    )}
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        'text-left text-sm transition-colors',
                        activeId === section.id
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
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
