import { createFileRoute } from '@tanstack/react-router'

import {
  LegalPageLayout,
  type TocSection,
} from '@/components/features/landing/legal-page-layout.component'

const SECTIONS: TocSection[] = [
  { id: 'what-are-cookies', title: 'What Are Cookies' },
  { id: 'how-we-use', title: 'How We Use Cookies' },
  { id: 'types', title: 'Types of Cookies' },
  { id: 'third-party', title: 'Third-Party Cookies' },
  { id: 'manage', title: 'How to Manage Cookies' },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact' },
]

const CookiePolicyPage = () => {
  return (
    <>
      <title>Cookie Policy — Ofluence</title>
      <meta
        name="description"
        content="Ofluence Cookie Policy — what cookies we use, why, and how to manage your preferences."
      />
      <LegalPageLayout
        title="Cookie Policy"
        lastUpdated="March 20, 2026"
        summary="We use essential cookies to keep the platform working, analytics cookies (PostHog) to improve the product, and functional cookies for your preferences. You can opt out of non-essential cookies anytime."
        sections={SECTIONS}
      >
        <section id="what-are-cookies">
          <h2 className="font-display text-xl font-semibold md:text-2xl">1. What Are Cookies</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Cookies are small text files placed on your device when you visit a website. They can be
            &ldquo;persistent&rdquo; (remaining until expiry or deletion) or &ldquo;session&rdquo;
            (deleted when you close your browser). They can be first-party (set by us) or
            third-party (set by other services on our site).
          </p>
        </section>

        <section id="how-we-use" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            2. How We Use Cookies
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Ofluence uses cookies to ensure the platform functions reliably, to keep your account
            secure, and to understand how users interact with the product. We give you control over
            non-essential cookies wherever possible.
          </p>
        </section>

        <section id="types" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            3. Types of Cookies We Use
          </h2>

          <h3 className="text-foreground mt-8 text-lg font-medium">Essential Cookies</h3>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Strictly necessary for the platform to operate. They handle session management,
            authentication, CSRF protection, and security. These cannot be disabled and do not
            require consent.
          </p>

          <h3 className="text-foreground mt-8 text-lg font-medium">Analytics Cookies</h3>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We use PostHog for product analytics to understand usage patterns, measure feature
            adoption, and diagnose performance issues. Data is aggregated and anonymized where
            possible. You can opt out through your account settings.
          </p>

          <h3 className="text-foreground mt-8 text-lg font-medium">Functional Cookies</h3>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Enable personalization features like theme preference (light/dark mode), language
            settings, and interface customizations. Disabling these may require you to reconfigure
            preferences each visit.
          </p>
        </section>

        <section id="third-party" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            4. Third-Party Cookies
          </h2>
          <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">PostHog</strong> — Session identification and
              feature usage tracking
            </li>
            <li>
              <strong className="text-foreground">Google Cloud</strong> — Infrastructure, load
              balancing, and security
            </li>
            <li>
              <strong className="text-foreground">Social media platforms</strong> — When you connect
              social accounts or view embedded social content
            </li>
          </ul>
        </section>

        <section id="manage" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            5. How to Manage Cookies
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Most browsers allow you to control cookies through settings. You can view, delete, or
            block cookies. Note that blocking essential cookies may prevent you from using core
            platform features like login and navigation.
          </p>
        </section>

        <section id="changes" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            6. Changes to This Policy
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We may update this Cookie Policy from time to time. Material changes will be reflected
            in the &ldquo;Last updated&rdquo; date and communicated through the platform or email.
          </p>
        </section>

        <section id="contact" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">7. Contact</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Questions about cookies? Contact us at{' '}
            <a href="mailto:privacy@ofluence.ai" className="text-primary hover:underline">
              privacy@ofluence.ai
            </a>
            .
          </p>
        </section>
      </LegalPageLayout>
    </>
  )
}

export const Route = createFileRoute('/cookie-policy')({
  component: CookiePolicyPage,
})
