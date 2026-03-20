import {
  Airplane01Icon,
  AnalyticsUpIcon,
  Building01Icon,
  ComputerIcon,
  CreditCardIcon,
  DashboardSquare01Icon,
  Dress01Icon,
  Dumbbell01Icon,
  HandCoinsIcon,
  Megaphone01Icon,
  MoneyReceive01Icon,
  PresentationBarChart01Icon,
  Search01Icon,
  SpoonAndForkIcon,
  UserMultipleIcon,
  UserSearch01Icon,
  WorkflowSquare01Icon,
} from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'

export interface AudienceSegment {
  id: string
  label: string
  headline: string
  description: string
  painPoints: string[]
  features: { title: string; description: string; icon: IconSvgElement }[]
  stat: { value: number; suffix: string; label: string }
}

export interface IndustryVertical {
  name: string
  description: string
  icon: IconSvgElement
}

export const AUDIENCE_SEGMENTS: AudienceSegment[] = [
  {
    id: 'brands',
    label: 'For Brands',
    headline: 'Scale Your Creator Partnerships',
    description:
      'Discover the right creators, manage campaigns end-to-end, and measure real ROI — all from one platform. Ofluence replaces scattered spreadsheets and manual outreach with streamlined workflows that let you focus on building authentic partnerships.',
    painPoints: [
      'Scattered spreadsheets and siloed campaign data',
      'No clear way to track ROI or attribute sales',
      'Hours wasted on manual creator outreach',
      'Compliance and contract headaches across regions',
    ],
    features: [
      {
        title: 'Creator Discovery',
        description:
          'Find creators by niche, engagement rate, audience demographics, and brand affinity with AI-powered search.',
        icon: Search01Icon,
      },
      {
        title: 'Campaign Management',
        description:
          'Create briefs, coordinate deliverables, and manage approvals in one organized workspace.',
        icon: Megaphone01Icon,
      },
      {
        title: 'Performance Analytics',
        description:
          'Auto-track reach, engagement, clicks, and sales with real-time dashboards and exportable reports.',
        icon: AnalyticsUpIcon,
      },
      {
        title: 'Payments',
        description:
          'Send fast, secure payments to creators in 180+ countries with built-in tax compliance.',
        icon: CreditCardIcon,
      },
    ],
    stat: { value: 10, suffix: 'x', label: 'Average ROI improvement' },
  },
  {
    id: 'agencies',
    label: 'For Agencies',
    headline: 'Manage Every Client from One Platform',
    description:
      'Run influencer campaigns across multiple brands without the chaos. Ofluence gives agencies a unified hub with separate workspaces, consolidated reporting, and team permissions — so you can scale client work without scaling complexity.',
    painPoints: [
      'Constant context-switching between client accounts',
      'No unified reporting across brands and campaigns',
      'Difficult to manage large creator rosters centrally',
      'Complex billing and invoicing across multiple clients',
    ],
    features: [
      {
        title: 'Multi-Brand Workspaces',
        description:
          'Manage multiple client brands under one agency account with isolated budgets and settings.',
        icon: Building01Icon,
      },
      {
        title: 'Unified Dashboard',
        description: 'See campaign performance across all clients in a single consolidated view.',
        icon: DashboardSquare01Icon,
      },
      {
        title: 'White-Label Reports',
        description:
          'Generate branded reports with campaign metrics, creator performance, and ROI for each client.',
        icon: PresentationBarChart01Icon,
      },
      {
        title: 'Team Permissions',
        description:
          'Assign roles and control access so every team member sees only what they need.',
        icon: UserMultipleIcon,
      },
    ],
    stat: { value: 60, suffix: '%', label: 'Time saved on reporting' },
  },
  {
    id: 'creators',
    label: 'For Creators & D2C',
    headline: 'Grow Your Brand and Income',
    description:
      'Whether you are a creator looking for brand deals or a D2C brand building a community, Ofluence connects you with the right partners. Showcase your work, streamline collaborations, and get paid faster — all in one place.',
    painPoints: [
      'Unprofessional or scattered brand outreach',
      'Late or unreliable payments for completed work',
      'No easy way to build and share a media kit',
      'Brand deals spread across DMs, emails, and spreadsheets',
    ],
    features: [
      {
        title: 'Media Kit Builder',
        description:
          'Create a professional profile with your rates, portfolio, audience demographics, and past collaborations.',
        icon: UserSearch01Icon,
      },
      {
        title: 'Brand Matching',
        description:
          'Get discovered by brands through AI-powered matching based on your niche, content quality, and audience.',
        icon: HandCoinsIcon,
      },
      {
        title: 'Content Workflow',
        description:
          'Receive briefs, submit drafts, get feedback, and publish — all in one organized workflow.',
        icon: WorkflowSquare01Icon,
      },
      {
        title: 'Fast Payments',
        description:
          'Receive payments on time in your preferred currency with transparent tracking and no surprises.',
        icon: MoneyReceive01Icon,
      },
    ],
    stat: { value: 3, suffix: 'x', label: 'More brand partnerships' },
  },
]

export const INDUSTRY_VERTICALS: IndustryVertical[] = [
  {
    name: 'Fashion & Beauty',
    description:
      'Connect with style influencers who drive trends and conversions in fashion, beauty, and lifestyle.',
    icon: Dress01Icon,
  },
  {
    name: 'Food & Beverage',
    description:
      'Partner with food creators, recipe developers, and restaurant reviewers to grow your brand.',
    icon: SpoonAndForkIcon,
  },
  {
    name: 'Technology',
    description:
      'Reach tech enthusiasts, reviewers, and early adopters through authentic creator content.',
    icon: ComputerIcon,
  },
  {
    name: 'Health & Wellness',
    description:
      'Work with fitness, wellness, and health creators who inspire trusted recommendations.',
    icon: Dumbbell01Icon,
  },
  {
    name: 'Travel & Hospitality',
    description:
      'Collaborate with travel influencers to showcase destinations, hotels, and experiences.',
    icon: Airplane01Icon,
  },
]
