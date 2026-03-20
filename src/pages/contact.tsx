import {
  CustomerServiceIcon,
  Mail01Icon,
  PresentationBarChart01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { toast } from 'sonner'

import { fadeInUp } from '@/utils/motion.utils'

import {
  AnimatedCard,
  AnimatedStaggerGrid,
  AnimatedStaggerItem,
  FadeInView,
} from '@/components/ui/animated-container'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LandingPageLayout } from '@/components/features/landing/landing-page-layout.component'

interface ContactMethod {
  icon: IconSvgElement
  title: string
  description: string
  action: string
  href: string
  gradient: string
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail01Icon,
    title: 'General Inquiries',
    description: 'Questions about Ofluence? We are happy to help.',
    action: 'hello@ofluence.ai',
    href: 'mailto:hello@ofluence.ai',
    gradient: 'from-chart-1/10 via-chart-1/15 to-chart-1/5 bg-gradient-to-br',
  },
  {
    icon: PresentationBarChart01Icon,
    title: 'Sales & Demos',
    description: 'Want a personalized walkthrough? Talk to our sales team.',
    action: 'sales@ofluence.ai',
    href: 'mailto:sales@ofluence.ai',
    gradient: 'from-chart-2/10 via-chart-2/15 to-chart-2/5 bg-gradient-to-br',
  },
  {
    icon: CustomerServiceIcon,
    title: 'Support',
    description: 'Already a customer? Our support team is here for you.',
    action: 'support@ofluence.ai',
    href: 'mailto:support@ofluence.ai',
    gradient: 'from-chart-4/10 via-chart-4/15 to-chart-4/5 bg-gradient-to-br',
  },
]

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'sales', label: 'Sales & Demos' },
  { value: 'support', label: 'Support' },
] as const

function ContactForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
    },
    onSubmit: () => {
      toast.success('Message sent!', {
        description: "We'll get back to you within 1-2 business days.",
      })
      form.reset()
    },
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit().catch(() => {
          // form handles errors internally
        })
      }}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <form.Field
          name="name"
          validators={{
            onBlur: ({ value }) => {
              if (!value || value.length < 2) return 'Name is required'
            },
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label htmlFor={field.name} className="text-sm font-medium">
                Name <span className="text-destructive">*</span>
              </label>
              <input
                id={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="Your name"
                className="border-border bg-background placeholder:text-muted-foreground focus:ring-primary/20 rounded-lg border px-3 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-destructive text-xs">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onBlur: ({ value }) => {
              if (!value) return 'Email is required'
              if (!value.includes('@') || !value.includes('.')) return 'Invalid email address'
            },
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label htmlFor={field.name} className="text-sm font-medium">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                id={field.name}
                type="email"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="you@company.com"
                className="border-border bg-background placeholder:text-muted-foreground focus:ring-primary/20 rounded-lg border px-3 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-destructive text-xs">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <form.Field name="company">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label htmlFor={field.name} className="text-sm font-medium">
                Company
              </label>
              <input
                id={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="Your company (optional)"
                className="border-border bg-background placeholder:text-muted-foreground focus:ring-primary/20 rounded-lg border px-3 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
              />
            </div>
          )}
        </form.Field>

        <form.Field
          name="subject"
          validators={{
            onBlur: ({ value }) => {
              if (!value) return 'Please select a subject'
            },
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label htmlFor={field.name} className="text-sm font-medium">
                Subject <span className="text-destructive">*</span>
              </label>
              <select
                id={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                className="border-border bg-background text-foreground focus:ring-primary/20 rounded-lg border px-3 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
              >
                <option value="" disabled>
                  Select a subject
                </option>
                {SUBJECT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {field.state.meta.errors.length > 0 && (
                <p className="text-destructive text-xs">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>
      </div>

      <form.Field
        name="message"
        validators={{
          onBlur: ({ value }) => {
            if (!value || value.length < 10) return 'Message must be at least 10 characters'
          },
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <label htmlFor={field.name} className="text-sm font-medium">
              Message <span className="text-destructive">*</span>
            </label>
            <textarea
              id={field.name}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              placeholder="Tell us how we can help..."
              rows={5}
              className="border-border bg-background placeholder:text-muted-foreground focus:ring-primary/20 rounded-lg border px-3 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-destructive text-xs">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send message'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}

const ContactPage = () => {
  return (
    <LandingPageLayout>
      <title>Contact — Ofluence</title>
      <meta
        name="description"
        content="Get in touch with the Ofluence team. Reach out for general inquiries, sales demos, or customer support."
      />

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
          <motion.div {...fadeInUp}>
            <p className="text-primary mb-4 text-sm font-medium tracking-widest uppercase">
              Contact
            </p>
            <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Get in touch
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
              Have questions about Ofluence? Want to see a demo? We&apos;d love to hear from you.
              Reach out through any of the channels below and we&apos;ll get back to you promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <AnimatedStaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {CONTACT_METHODS.map((method) => (
              <AnimatedStaggerItem key={method.title}>
                <AnimatedCard>
                  <Card className={method.gradient}>
                    <CardContent className="flex flex-col items-center gap-4 text-center">
                      <div className="bg-background/60 flex size-12 items-center justify-center rounded-xl">
                        <HugeiconsIcon icon={method.icon} className="text-foreground/70 size-6" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold">{method.title}</h3>
                        <p className="text-muted-foreground mt-1 text-sm">{method.description}</p>
                      </div>
                      <a
                        href={method.href}
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        {method.action}
                      </a>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </AnimatedStaggerItem>
            ))}
          </AnimatedStaggerGrid>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 md:px-8">
          <FadeInView>
            <h2 className="font-display mb-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Send us a message
            </h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Fill out the form below and we&apos;ll get back to you within 1-2 business days.
            </p>
            <ContactForm />
          </FadeInView>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mesh-warm py-20 md:py-28">
        <FadeInView className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg leading-relaxed">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" render={<Link to="/contact" />}>
              Try for free
            </Button>
          </div>
        </FadeInView>
      </section>
    </LandingPageLayout>
  )
}

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})
