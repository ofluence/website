import {
  AnalyticsUpIcon,
  CloudIcon,
  ContactIcon,
  FacebookIcon,
  InstagramIcon,
  NewTwitterIcon,
  ShoppingBag02Icon,
  ShoppingCart01Icon,
  TiktokIcon,
  YoutubeIcon,
} from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'

export type IntegrationStatus = 'active' | 'coming-soon'

export type IntegrationCategory = 'social' | 'ecommerce' | 'crm' | 'analytics'

export interface Integration {
  name: string
  description: string
  status: IntegrationStatus
  category: IntegrationCategory
  icon: IconSvgElement
}

export interface IntegrationCategoryInfo {
  id: IntegrationCategory
  title: string
  description: string
}

export const INTEGRATIONS: Integration[] = [
  {
    name: 'Instagram',
    description: 'Discover creators, track posts, and measure engagement on Instagram.',
    status: 'active',
    category: 'social',
    icon: InstagramIcon,
  },
  {
    name: 'YouTube',
    description: 'Find YouTubers, monitor video performance, and track subscriber growth.',
    status: 'active',
    category: 'social',
    icon: YoutubeIcon,
  },
  {
    name: 'TikTok',
    description: 'Tap into viral content creators and track TikTok campaign performance.',
    status: 'coming-soon',
    category: 'social',
    icon: TiktokIcon,
  },
  {
    name: 'Twitter / X',
    description: 'Monitor tweets, track mentions, and measure X campaign reach.',
    status: 'coming-soon',
    category: 'social',
    icon: NewTwitterIcon,
  },
  {
    name: 'Shopify',
    description: 'Sync product catalogs, track affiliate sales, and automate creator commissions.',
    status: 'coming-soon',
    category: 'ecommerce',
    icon: ShoppingBag02Icon,
  },
  {
    name: 'WooCommerce',
    description: 'Connect your WooCommerce store for seamless product gifting and sales tracking.',
    status: 'coming-soon',
    category: 'ecommerce',
    icon: ShoppingCart01Icon,
  },
  {
    name: 'HubSpot',
    description: 'Sync creator contacts, track deal pipelines, and automate outreach workflows.',
    status: 'coming-soon',
    category: 'crm',
    icon: ContactIcon,
  },
  {
    name: 'Salesforce',
    description: 'Enterprise CRM integration for managing creator relationships at scale.',
    status: 'coming-soon',
    category: 'crm',
    icon: CloudIcon,
  },
  {
    name: 'Google Analytics',
    description: 'Deep-link campaign attribution and measure creator-driven website traffic.',
    status: 'coming-soon',
    category: 'analytics',
    icon: AnalyticsUpIcon,
  },
  {
    name: 'Meta Ads',
    description: 'Amplify top-performing creator content through paid social campaigns.',
    status: 'coming-soon',
    category: 'analytics',
    icon: FacebookIcon,
  },
]

export const INTEGRATION_CATEGORIES: IntegrationCategoryInfo[] = [
  {
    id: 'social',
    title: 'Social Platforms',
    description: 'Connect directly with major social media platforms for real-time creator data.',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Link your online store to track sales, gifting, and affiliate revenue.',
  },
  {
    id: 'crm',
    title: 'CRM & Outreach',
    description: 'Sync your customer relationship tools for seamless creator management.',
  },
  {
    id: 'analytics',
    title: 'Analytics & Ads',
    description: 'Measure campaign impact and amplify top content with paid media.',
  },
]
