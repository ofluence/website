import { createFileRoute } from '@tanstack/react-router'

import { Seo } from '@/components/features/global/seo.component'
import {
  LegalPageLayout,
  type TocSection,
} from '@/components/features/landing/legal-page-layout.component'

const SECTIONS: TocSection[] = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'service', title: 'Description of Service' },
  { id: 'registration', title: 'Account Registration' },
  { id: 'billing', title: 'Subscription & Billing' },
  { id: 'conduct', title: 'User Conduct' },
  { id: 'obligations', title: 'Creator & Brand Obligations' },
  { id: 'content', title: 'Content Ownership' },
  { id: 'ip', title: 'Intellectual Property' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'indemnification', title: 'Indemnification' },
  { id: 'termination', title: 'Termination' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'disputes', title: 'Dispute Resolution' },
  { id: 'changes', title: 'Changes to Terms' },
  { id: 'contact', title: 'Contact Us' },
]

const TermsOfServicePage = () => {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="Ofluence Terms of Service — the agreement between you and Ofluence governing use of our influencer marketing platform."
        path="/terms-of-service"
      />
      <LegalPageLayout
        title="Terms of Service"
        lastUpdated="March 20, 2026"
        summary="In short: Use the platform fairly, pay for what you use, respect other users and creators. We provide the service as-is and are governed by Ontario, Canada law."
        sections={SECTIONS}
      >
        <section id="acceptance">
          <h2 className="font-display text-xl font-semibold md:text-2xl">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            By accessing or using the Ofluence platform at{' '}
            <a href="https://ofluence.ai" className="text-primary hover:underline">
              ofluence.ai
            </a>{' '}
            (the &ldquo;Platform&rdquo;), you agree to be bound by these Terms of Service. These
            Terms constitute a legally binding agreement between you and Ofluence Inc. You must be
            at least 18 years of age to use the Platform.
          </p>
        </section>

        <section id="service" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            2. Description of Service
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Ofluence is an influencer marketing SaaS platform for brands, agencies, and creators.
            Features include:
          </p>
          <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6">
            <li>Creator discovery and audience analytics</li>
            <li>Campaign creation, management, and workflow automation</li>
            <li>Content tracking and deliverable management</li>
            <li>Performance analytics, reporting, and ROI measurement</li>
            <li>Payment processing and invoicing</li>
            <li>Team collaboration and multi-tenant management</li>
          </ul>
        </section>

        <section id="registration" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            3. Account Registration
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            You must create an account with accurate, current, and complete information. You are
            responsible for maintaining the confidentiality of your credentials and for all activity
            under your account.
          </p>
        </section>

        <section id="billing" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            4. Subscription Plans and Billing
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Ofluence offers Starter (free), Growth, Business, and Enterprise tiers. Paid plans are
            billed monthly or annually through Stripe. Subscriptions auto-renew unless cancelled. We
            provide at least 30 days&apos; notice before price increases.
          </p>
        </section>

        <section id="conduct" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">5. User Conduct</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">You agree not to:</p>
          <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6">
            <li>Scrape or harvest data without authorization</li>
            <li>Create fake accounts or misrepresent your identity</li>
            <li>Harass, abuse, or threaten other users</li>
            <li>Manipulate engagement data or campaign metrics</li>
            <li>Attempt unauthorized access to Platform systems</li>
            <li>Send spam through the Platform</li>
            <li>Reverse engineer any part of the Platform</li>
          </ul>
        </section>

        <section id="obligations" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            6. Creator and Brand Obligations
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Brands agree to pay creators for completed deliverables. Creators agree to provide
            accurate metrics and comply with advertising disclosure regulations.
          </p>
        </section>

        <section id="content" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">7. Content Ownership</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            You retain all intellectual property rights in your content. By using the Service, you
            grant Ofluence a non-exclusive, worldwide, royalty-free license to use, display, and
            distribute your content solely for operating the Platform.
          </p>
        </section>

        <section id="ip" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            8. Intellectual Property
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            The Platform, including its design, features, code, and documentation, is owned by
            Ofluence Inc. Feedback and suggestions you provide may be used without obligation to
            you.
          </p>
        </section>

        <section id="liability" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            9. Limitation of Liability
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            The Platform is provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE.&rdquo; Our total
            liability shall not exceed the amount paid in the 12 months preceding the claim, or CAD
            $50 for free-tier users.
          </p>
        </section>

        <section id="indemnification" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">10. Indemnification</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            You agree to indemnify and hold harmless Ofluence from any claims arising from your use
            of the Platform or violation of these Terms.
          </p>
        </section>

        <section id="termination" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">11. Termination</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Either party may terminate at any time. Your data is retained for 30 days after
            termination before permanent deletion, unless otherwise required by law.
          </p>
        </section>

        <section id="governing-law" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">12. Governing Law</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            These Terms are governed by the laws of the Province of Ontario, Canada.
          </p>
        </section>

        <section id="disputes" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">13. Dispute Resolution</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Disputes shall first be resolved through good faith negotiation (30 days), then binding
            arbitration in Toronto, Ontario.
          </p>
        </section>

        <section id="changes" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">14. Changes to Terms</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We will provide at least 30 days&apos; advance notice for material changes.
          </p>
        </section>

        <section id="contact" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">15. Contact Us</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Questions about these Terms? Contact us at{' '}
            <a href="mailto:legal@ofluence.ai" className="text-primary hover:underline">
              legal@ofluence.ai
            </a>
            .
          </p>
        </section>
      </LegalPageLayout>
    </>
  )
}

export const Route = createFileRoute('/terms-of-service')({
  component: TermsOfServicePage,
})
