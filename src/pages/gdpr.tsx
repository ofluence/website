import { createFileRoute } from '@tanstack/react-router'

import { Seo } from '@/components/features/global/seo.component'
import {
  LegalPageLayout,
  type TocSection,
} from '@/components/features/landing/legal-page-layout.component'

const SECTIONS: TocSection[] = [
  { id: 'commitment', title: 'Our Commitment' },
  { id: 'controller', title: 'Data Controller' },
  { id: 'lawful-basis', title: 'Lawful Basis' },
  { id: 'data-processed', title: 'Data We Process' },
  { id: 'rights', title: 'Your Rights' },
  { id: 'exercise-rights', title: 'Exercising Your Rights' },
  { id: 'dpo', title: 'Data Protection Officer' },
  { id: 'sub-processors', title: 'Sub-processors' },
  { id: 'transfers', title: 'International Transfers' },
  { id: 'breach', title: 'Data Breach Notification' },
  { id: 'dpa', title: 'Data Processing Agreement' },
]

const GdprPage = () => {
  return (
    <>
      <Seo
        title="GDPR Compliance"
        description="Ofluence GDPR Compliance — our commitment to data protection, your rights, and how we handle personal data under the GDPR."
        path="/gdpr"
      />
      <LegalPageLayout
        title="GDPR Compliance"
        lastUpdated="March 20, 2026"
        summary="Ofluence is built with privacy by design. We process data only with a valid legal basis, honor all data subject rights within 30 days, and use Standard Contractual Clauses for international transfers. Our DPO is reachable at dpo@ofluence.ai."
        sections={SECTIONS}
      >
        <section id="commitment">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            1. Our Commitment to GDPR
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Ofluence is fully committed to compliance with the General Data Protection Regulation
            (GDPR). Our systems, processes, and policies are designed with data protection
            principles at their core, including data minimization, purpose limitation, and privacy
            by design.
          </p>
        </section>

        <section id="controller" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">2. Data Controller</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            <strong className="text-foreground">Ofluence Inc.</strong>
            <br />
            Data Protection Officer:{' '}
            <a href="mailto:dpo@ofluence.ai" className="text-primary hover:underline">
              dpo@ofluence.ai
            </a>
          </p>
        </section>

        <section id="lawful-basis" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            3. Lawful Basis for Processing
          </h2>
          <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">Consent</strong> — Marketing communications,
              optional analytics
            </li>
            <li>
              <strong className="text-foreground">Contractual necessity</strong> — Platform access,
              campaign workflows, payments
            </li>
            <li>
              <strong className="text-foreground">Legitimate interests</strong> — Product
              improvement, fraud prevention, security
            </li>
            <li>
              <strong className="text-foreground">Legal obligation</strong> — Tax reporting, legal
              proceedings
            </li>
          </ul>
        </section>

        <section id="data-processed" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">4. Data We Process</h2>
          <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">Account data</strong> — Name, email, password
              (hashed), profile photo, organization details
            </li>
            <li>
              <strong className="text-foreground">Creator profiles</strong> — Display names, bios,
              content categories, audience demographics
            </li>
            <li>
              <strong className="text-foreground">Social media metrics</strong> — Engagement rates,
              follower counts, reach, impressions
            </li>
            <li>
              <strong className="text-foreground">Usage analytics</strong> — Pages visited, features
              used, session duration, device information
            </li>
            <li>
              <strong className="text-foreground">Payment data</strong> — Billing information
              processed exclusively by Stripe (PCI DSS Level 1)
            </li>
          </ul>
        </section>

        <section id="rights" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            5. Your Rights as a Data Subject
          </h2>
          <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">Right of access</strong> — Request a copy of your
              personal data
            </li>
            <li>
              <strong className="text-foreground">Right to rectification</strong> — Correct
              inaccurate data
            </li>
            <li>
              <strong className="text-foreground">Right to erasure</strong> — Request deletion of
              your data
            </li>
            <li>
              <strong className="text-foreground">Right to data portability</strong> — Receive data
              in machine-readable format
            </li>
            <li>
              <strong className="text-foreground">Right to restrict processing</strong> — Limit how
              we process your data
            </li>
            <li>
              <strong className="text-foreground">Right to object</strong> — Object to processing
              based on legitimate interests
            </li>
            <li>
              <strong className="text-foreground">Right to withdraw consent</strong> — Withdraw
              consent at any time
            </li>
            <li>
              <strong className="text-foreground">Right to lodge a complaint</strong> — File with
              your local supervisory authority
            </li>
          </ul>
        </section>

        <section id="exercise-rights" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            6. How to Exercise Your Rights
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Contact our DPO at{' '}
            <a href="mailto:dpo@ofluence.ai" className="text-primary hover:underline">
              dpo@ofluence.ai
            </a>
            . We acknowledge requests within 72 hours and respond within 30 calendar days
            (extendable by 60 days for complex requests).
          </p>
        </section>

        <section id="dpo" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            7. Data Protection Officer
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Our DPO oversees all data protection matters. Contact:{' '}
            <a href="mailto:dpo@ofluence.ai" className="text-primary hover:underline">
              dpo@ofluence.ai
            </a>
          </p>
        </section>

        <section id="sub-processors" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">8. Sub-processors</h2>
          <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">Google Cloud Platform</strong> — Infrastructure
              and hosting (EU and US regions)
            </li>
            <li>
              <strong className="text-foreground">PostHog</strong> — Product analytics and session
              insights
            </li>
            <li>
              <strong className="text-foreground">Transactional email service</strong> — Account
              notifications and communications
            </li>
            <li>
              <strong className="text-foreground">Stripe</strong> — Payment processing (PCI DSS
              Level 1 certified)
            </li>
          </ul>
        </section>

        <section id="transfers" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            9. International Data Transfers
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            For transfers outside the EEA, we use Standard Contractual Clauses (SCCs) and the EU-US
            Data Privacy Framework where applicable. We regularly assess transfer mechanisms and
            implement supplementary measures where necessary.
          </p>
        </section>

        <section id="breach" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            10. Data Breach Notification
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We notify the relevant supervisory authority within 72 hours of becoming aware of a
            breach. High-risk breaches trigger direct notification to affected individuals. We
            maintain a comprehensive incident response plan and conduct regular security
            assessments.
          </p>
        </section>

        <section id="dpa" className="mt-12">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            11. Data Processing Agreement
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We offer a Data Processing Agreement (DPA) to all customers who require one. Contact{' '}
            <a href="mailto:dpo@ofluence.ai" className="text-primary hover:underline">
              dpo@ofluence.ai
            </a>{' '}
            to request a copy.
          </p>
        </section>
      </LegalPageLayout>
    </>
  )
}

export const Route = createFileRoute('/gdpr')({
  component: GdprPage,
})
