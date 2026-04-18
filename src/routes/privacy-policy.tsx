import { createFileRoute } from '@tanstack/react-router'

import { seo } from '@/utils/seo.utils'

import {
  LegalPageLayout,
  type TocSection,
} from '@/components/features/landing/legal-page-layout.component'

const SECTIONS: TocSection[] = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-collected', title: 'Information We Collect' },
  { id: 'how-we-use', title: 'How We Use Your Information' },
  { id: 'legal-basis', title: 'Legal Basis (GDPR)' },
  { id: 'data-sharing', title: 'Data Sharing' },
  { id: 'international-transfers', title: 'International Transfers' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'cookies', title: 'Cookies and Tracking' },
  { id: 'children', title: "Children's Privacy" },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact Us' },
]

const PrivacyPolicyPage = () => {
  return (
    <>
      <LegalPageLayout
        title="Privacy Policy"
        lastUpdated="March 20, 2026"
        summary="In short: We collect only what we need to run the platform, we never sell your data, and you can delete your account at any time. We're GDPR compliant and transparent about everything we do with your information."
        sections={SECTIONS}
      >
        {/* 1. Introduction */}
        <section id="introduction">
          <h2 className="font-display text-xl font-semibold md:text-2xl">1. Introduction</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Ofluence Inc. (&ldquo;Ofluence&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
            &ldquo;our&rdquo;) operates the website{' '}
            <a
              href="https://ofluence.ai"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ofluence.ai
            </a>{' '}
            and the Ofluence platform (collectively, the &ldquo;Service&rdquo;). This Privacy Policy
            explains how we collect, use, disclose, and safeguard your personal information when you
            visit our website, create an account, or use our influencer marketing platform.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            By accessing or using the Service, you agree to the collection and use of information in
            accordance with this Privacy Policy. If you do not agree with our policies and
            practices, please do not use the Service.
          </p>
        </section>

        {/* 2. Information We Collect */}
        <section id="information-collected" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            2. Information We Collect
          </h2>

          <h3 className="mt-8 text-lg font-semibold">2.1 Account Information</h3>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            When you register for an Ofluence account, we collect information that identifies you as
            an individual, including:
          </p>
          <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6">
            <li>Full name and email address</li>
            <li>Company or agency name and role</li>
            <li>Password (stored using industry-standard hashing)</li>
            <li>Profile picture (optional)</li>
          </ul>

          <h3 className="mt-8 text-lg font-semibold">2.2 Creator Profile Data</h3>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            For creators using Ofluence, we may collect additional information to build your
            professional profile, including social media handles, audience demographics, content
            categories, rates, and portfolio samples.
          </p>

          <h3 className="mt-8 text-lg font-semibold">2.3 Social Media Data</h3>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            With your authorization, we access publicly available social media data including
            follower counts, engagement metrics, audience demographics, and content performance data
            from platforms such as Instagram and YouTube.
          </p>

          <h3 className="mt-8 text-lg font-semibold">2.4 Usage Data</h3>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We automatically collect information about how you interact with the Service, including
            pages visited, features used, search queries, timestamps, browser type, device
            information, and IP address.
          </p>

          <h3 className="mt-8 text-lg font-semibold">2.5 Payment Information</h3>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Payment processing is handled by Stripe. We do not store complete credit card numbers.
            Stripe may collect billing details including card type, last four digits, and billing
            address to process transactions.
          </p>
        </section>

        {/* 3. How We Use Your Information */}
        <section id="how-we-use" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            3. How We Use Your Information
          </h2>
          <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6">
            <li>To provide, maintain, and improve the Service</li>
            <li>To create and manage your account</li>
            <li>To match brands with relevant creators</li>
            <li>To process payments and manage subscriptions</li>
            <li>To send transactional communications</li>
            <li>To analyze usage patterns and improve our platform</li>
            <li>To detect and prevent fraud or unauthorized access</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        {/* 4. Legal Basis */}
        <section id="legal-basis" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            4. Legal Basis for Processing (GDPR)
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            For users in the European Economic Area, we process personal data based on:
          </p>
          <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">Consent</strong> — Marketing emails, optional
              cookies
            </li>
            <li>
              <strong className="text-foreground">Contractual necessity</strong> — Fulfilling our
              terms of service
            </li>
            <li>
              <strong className="text-foreground">Legitimate interests</strong> — Analytics, product
              improvement, fraud prevention
            </li>
            <li>
              <strong className="text-foreground">Legal obligations</strong> — Compliance with
              applicable laws
            </li>
          </ul>
        </section>

        {/* 5. Data Sharing */}
        <section id="data-sharing" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            5. Data Sharing and Third Parties
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We do not sell your personal information. We may share data with trusted third-party
            service providers:
          </p>
          <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6">
            <li>Google Cloud — Infrastructure and hosting</li>
            <li>Stripe — Payment processing</li>
            <li>PostHog — Product analytics</li>
            <li>Transactional email service — Communication delivery</li>
          </ul>
        </section>

        {/* 6. International Transfers */}
        <section id="international-transfers" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            6. International Data Transfers
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Your data may be transferred to and processed in countries outside of your jurisdiction.
            For transfers from the EEA, we rely on Standard Contractual Clauses (SCCs) approved by
            the European Commission and adequacy decisions where applicable.
          </p>
        </section>

        {/* 7. Data Retention */}
        <section id="data-retention" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">7. Data Retention</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We retain your personal data for as long as your account is active. After account
            deletion, most data is removed within 30 days. Usage analytics are retained for up to 2
            years in aggregated form. Billing records are retained for 5+ years as required by tax
            regulations.
          </p>
        </section>

        {/* 8. Your Rights */}
        <section id="your-rights" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">8. Your Rights</h2>
          <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6">
            <li>Right to access your personal data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure (&ldquo;right to be forgotten&rdquo;)</li>
            <li>Right to data portability</li>
            <li>Right to restrict processing</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent at any time</li>
          </ul>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:privacy@ofluence.ai" className="text-primary hover:underline">
              privacy@ofluence.ai
            </a>
            .
          </p>
        </section>

        {/* 9. Cookies */}
        <section id="cookies" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            9. Cookies and Tracking
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We use cookies and similar technologies to operate the platform and analyze usage. For
            details, see our{' '}
            <a href="/cookie-policy" className="text-primary hover:underline">
              Cookie Policy
            </a>
            .
          </p>
        </section>

        {/* 10. Children */}
        <section id="children" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            10. Children&apos;s Privacy
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            The Service is not intended for individuals under 16. We do not knowingly collect
            personal information from children.
          </p>
        </section>

        {/* 11. Changes */}
        <section id="changes" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            11. Changes to This Policy
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We will notify you of material changes at least 30 days before they take effect by email
            or a notice on the Service.
          </p>
        </section>

        {/* 12. Contact */}
        <section id="contact" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">12. Contact Us</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Questions about this Privacy Policy? Contact us at{' '}
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

export const Route = createFileRoute('/privacy-policy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy — Ofluence' },
      ...seo({
        title: 'Privacy Policy — Ofluence',
        description:
          'Ofluence Privacy Policy — how we collect, use, and protect your personal information. GDPR compliant.',
        path: '/privacy-policy',
      }),
    ],
    links: [{ rel: 'canonical', href: 'https://ofluence.ai/privacy-policy' }],
  }),
  component: PrivacyPolicyPage,
})
