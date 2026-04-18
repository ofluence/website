import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { m } from 'motion/react'
import { toast } from 'sonner'

import { FadeInView } from '@/components/ui/animated-container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { seo } from '@/utils/seo.utils'

import { LandingPageLayout } from '@/components/features/landing/landing-page-layout.component'

interface ContactMethod {
  title: string
  email: string
  href: string
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    title: 'General Inquiries',
    email: 'hello@ofluence.ai',
    href: 'mailto:hello@ofluence.ai',
  },
  {
    title: 'Sales & Demos',
    email: 'sales@ofluence.ai',
    href: 'mailto:sales@ofluence.ai',
  },
  {
    title: 'Support',
    email: 'support@ofluence.ai',
    href: 'mailto:support@ofluence.ai',
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
      className="flex flex-col gap-6 sm:gap-10"
    >
      <div className="grid grid-cols-1 gap-6 sm:gap-10 md:grid-cols-2">
        <form.Field
          name="name"
          validators={{
            onBlur: ({ value }) => {
              if (!value || value.length < 2) return 'Name is required'
            },
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1">
              <label
                htmlFor={field.name}
                className="text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]"
              >
                Name <span className="text-primary">*</span>
              </label>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="Your name"
                className="h-11 rounded-lg px-4"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-destructive mt-1 text-xs">{field.state.meta.errors[0]}</p>
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
            <div className="flex flex-col gap-1">
              <label
                htmlFor={field.name}
                className="text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]"
              >
                Email <span className="text-primary">*</span>
              </label>
              <Input
                id={field.name}
                type="email"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="you@company.com"
                className="h-11 rounded-lg px-4"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-destructive mt-1 text-xs">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <form.Field name="company">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label
                htmlFor={field.name}
                className="text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]"
              >
                Company
              </label>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="Your company (optional)"
                className="h-11 rounded-lg px-4"
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
            <div className="flex flex-col gap-1">
              <label
                htmlFor={field.name}
                className="text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]"
              >
                Subject <span className="text-primary">*</span>
              </label>
              <select
                id={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                className="border-input focus-visible:border-ring focus-visible:ring-primary/15 dark:bg-input/30 h-11 w-full cursor-pointer appearance-none rounded-lg border bg-transparent px-4 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-4 md:text-sm"
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
                <p className="text-destructive mt-1 text-xs">{field.state.meta.errors[0]}</p>
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
          <div className="flex flex-col gap-1">
            <label
              htmlFor={field.name}
              className="text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]"
            >
              Message <span className="text-primary">*</span>
            </label>
            <Textarea
              id={field.name}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              placeholder="Tell us how we can help..."
              rows={5}
              className="rounded-lg px-4"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-destructive mt-1 text-xs">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <div>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send message'}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-4"
                data-icon="inline-end"
              />
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}

const ContactPage = () => {
  return (
    <LandingPageLayout>
      {/* Hero */}
      <section className="pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <FadeInView>
            <p className="text-muted-foreground mb-6 text-xs font-medium uppercase tracking-[0.3em]">
              Contact
            </p>
          </FadeInView>
          <FadeInView>
            <h1 className="text-display-hero">Let&apos;s talk.</h1>
          </FadeInView>
        </div>
      </section>

      {/* Contact methods */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          {CONTACT_METHODS.map((method, index) => (
            <div key={method.title}>
              {index > 0 && <Separator />}
              <FadeInView>
                <div className="flex flex-col justify-between gap-2 py-10 md:flex-row md:items-center md:py-14">
                  <h3 className="font-display text-2xl md:text-3xl">{method.title}</h3>
                  <a
                    href={method.href}
                    className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-2 text-lg transition-colors"
                  >
                    {method.email}
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </FadeInView>
            </div>
          ))}
          <Separator />
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="grid grid-cols-1 gap-10 sm:gap-16 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-4">
              <FadeInView>
                <p className="text-muted-foreground mb-4 text-xs font-medium uppercase tracking-[0.3em]">
                  Write to us
                </p>
                <h2 className="text-display-subsection">
                  Send us a message
                </h2>
                <p className="text-muted-foreground mt-6 text-base leading-relaxed">
                  Fill out the form and we&apos;ll get back to you within 1-2 business days.
                </p>
              </FadeInView>
            </div>
            <div className="lg:col-span-8">
              <FadeInView>
                <ContactForm />
              </FadeInView>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <Separator />
          <div className="py-20 md:py-28">
            <FadeInView>
              <p className="text-muted-foreground mb-6 text-xs font-medium uppercase tracking-[0.3em]">
                Get started
              </p>
              <h2 className="text-display-section max-w-3xl">
                Ready to transform your influencer marketing?
              </h2>
              <div className="mt-10">
                <m.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  <Button variant="ghost" render={<Link to="/pricing" />}>
                    Start your 14-day free trial
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="size-5"
                      data-icon="inline-end"
                    />
                  </Button>
                </m.div>
              </div>
            </FadeInView>
          </div>
          <Separator />
        </div>
      </section>
    </LandingPageLayout>
  )
}

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact — Ofluence' },
      ...seo({
        title: 'Contact — Ofluence',
        description:
          'Get in touch with the Ofluence team. Reach out for general inquiries, sales demos, or customer support.',
        path: '/contact',
      }),
    ],
    links: [{ rel: 'canonical', href: 'https://ofluence.ai/contact' }],
  }),
  component: ContactPage,
})
