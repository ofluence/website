import {
  AnalyticsUpIcon,
  CreditCardIcon,
  Megaphone01Icon,
  Search01Icon,
} from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'

export interface LandingFeature {
  title: string
  headline: string
  description: string
  badgeVariant: 'coral' | 'sage' | 'lavender' | 'sky'
  gradient: string
  icon: IconSvgElement
}

export interface LandingStep {
  title: string
  description: string
}

export interface LandingPricingTier {
  name: string
  price: string
  annualPrice?: string
  period: string
  description: string
  features: string[]
  cta: string
  ctaHref?: string
  highlighted: boolean
}

export interface LandingStat {
  value: number
  label: string
  prefix?: string
  suffix?: string
}

export interface LandingFooterLinkGroup {
  title: string
  links: { label: string; href: string }[]
}

export const LANDING_STATS: LandingStat[] = [
  { value: 2, label: 'Platforms Supported', prefix: '', suffix: '' },
  { value: 180, label: 'Countries Coverage', suffix: '+' },
  { value: 5, label: 'Minute Setup', suffix: ' min' },
]

export const LANDING_FEATURES: LandingFeature[] = [
  {
    title: 'Discover Creators',
    headline: 'Find your next brand partner with smart filters',
    description:
      'Search creators by niche, engagement rate, audience demographics, location, and brand affinity. AI-powered matching goes beyond follower counts to find creators who actually drive results.',
    badgeVariant: 'coral',
    gradient: 'from-chart-1/10 via-chart-1/15 to-chart-1/5 bg-gradient-to-br',
    icon: Search01Icon,
  },
  {
    title: 'Manage Campaigns',
    headline: 'Keep every collaboration organized from start to finish',
    description:
      'Unified workspace for partnerships, affiliates, and gifting. Create briefs, manage deliverables, and coordinate creators — no more scattered spreadsheets or endless email threads.',
    badgeVariant: 'sage',
    gradient: 'from-chart-2/10 via-chart-2/15 to-chart-2/5 bg-gradient-to-br',
    icon: Megaphone01Icon,
  },
  {
    title: 'Track Performance',
    headline: 'Auto-track content, reach, and ROI across every campaign',
    description:
      'Automatic post capture tracks reach, clicks, sales, EMV, and ROAS. Generate reports that prove real impact to stakeholders without manual screenshot hunting.',
    badgeVariant: 'lavender',
    gradient: 'from-chart-3/10 via-chart-3/15 to-chart-3/5 bg-gradient-to-br',
    icon: AnalyticsUpIcon,
  },
  {
    title: 'Pay Creators',
    headline: 'Send fast, secure payments to creators worldwide',
    description:
      'Process payments in 180+ countries with customizable commissions, automated payouts, and built-in tax compliance. Creators get paid on time, every time.',
    badgeVariant: 'sky',
    gradient: 'from-chart-4/10 via-chart-4/15 to-chart-4/5 bg-gradient-to-br',
    icon: CreditCardIcon,
  },
]

export const LANDING_HOW_IT_WORKS: Record<string, { label: string; steps: LandingStep[] }> = {
  brands: {
    label: 'For Brands',
    steps: [
      {
        title: 'Create Your Brief',
        description:
          'Define campaign goals, target audience, content requirements, and budget in a structured brief template.',
      },
      {
        title: 'Find the Right Creators',
        description:
          'Search creators with smart filters for niche, engagement rate, audience demographics, and brand affinity.',
      },
      {
        title: 'Review & Approve Content',
        description:
          'Multi-stage approval workflows with inline feedback. No more back-and-forth over email or DMs.',
      },
      {
        title: 'Track What Matters',
        description:
          'Auto-capture posts and track reach, engagement, clicks, and sales in real-time dashboards.',
      },
    ],
  },
  agencies: {
    label: 'For Agencies',
    steps: [
      {
        title: 'Onboard Client Brands',
        description:
          'Add multiple brands under one agency account with separate workspaces, budgets, and team permissions.',
      },
      {
        title: 'Run Campaigns at Scale',
        description:
          'Manage campaigns across all client brands from a unified view. Coordinate briefs, timelines, and deliverables.',
      },
      {
        title: 'Coordinate Creator Rosters',
        description:
          'Match the right creators to the right campaigns. Manage relationships, contracts, and communication centrally.',
      },
      {
        title: 'Deliver Client Reports',
        description:
          'Generate white-label reports with campaign metrics, creator performance, and ROI analysis for each client.',
      },
    ],
  },
  creators: {
    label: 'For Creators',
    steps: [
      {
        title: 'Build Your Media Kit',
        description:
          'Create a professional profile with your rates, portfolio, audience demographics, and collaboration history.',
      },
      {
        title: 'Get Discovered by Brands',
        description:
          'Brands find you through AI-powered discovery based on your niche, content quality, and audience match.',
      },
      {
        title: 'Collaborate & Create',
        description:
          'Receive campaign briefs, submit content drafts, get feedback, and publish — all in one organized workflow.',
      },
      {
        title: 'Grow Your Income',
        description:
          'Track your performance metrics, receive payments in your currency, and build long-term brand partnerships.',
      },
    ],
  },
}

export const LANDING_PRICING_TIERS: LandingPricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    period: 'Free forever',
    description: 'For individuals getting started',
    features: [
      '1 brand account',
      '50 creator searches/mo',
      'Basic analytics dashboard',
      'Community support',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$199',
    annualPrice: '$159',
    period: '/month',
    description: 'For growing brands',
    features: [
      'Up to 100 creators',
      '300 profile views/mo',
      'Full analytics suite',
      'Content tracking',
      '2 team members',
      'Email support',
    ],
    cta: 'Start 14-Day Trial',
    highlighted: false,
  },
  {
    name: 'Business',
    price: '$499',
    annualPrice: '$399',
    period: '/month',
    description: 'For scaling teams',
    features: [
      'Up to 250 creators',
      '800 profile views/mo',
      'Priority discovery',
      'Team management & roles',
      'API access',
      '5 team members',
    ],
    cta: 'Start 14-Day Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For agencies & large organizations',
    features: [
      'Unlimited everything',
      'SSO & advanced security',
      'Dedicated success manager',
      'Custom integrations',
      'SLA guarantee',
      '0% payout fees',
    ],
    cta: 'Contact Sales',
    ctaHref: '/contact',
    highlighted: false,
  },
]

export const LANDING_FOOTER_LINKS: LandingFooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'How It Works', href: '/#how-it-works' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'GDPR', href: '/gdpr' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
    ],
  },
]

export const LANDING_NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
] as const
