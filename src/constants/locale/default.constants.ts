import type { LocaleContent } from '@/constants/locale/locale.constants'

export const DEFAULT_LOCALE: LocaleContent = {
  region: {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
  },
  creators: [
    {
      name: 'Luna N.',
      handle: '@lunafashion',
      followers: '1.5M',
      niche: 'Fashion',
      gradient: 'from-chart-1/30 to-chart-2/30',
    },
    {
      name: 'Marcus R.',
      handle: '@marcusfit',
      followers: '890K',
      niche: 'Fitness',
      gradient: 'from-chart-2/30 to-chart-3/30',
    },
    {
      name: 'Emma T.',
      handle: '@emmatravels',
      followers: '1.2M',
      niche: 'Travel',
      gradient: 'from-chart-3/30 to-chart-4/30',
    },
    {
      name: 'Priya S.',
      handle: '@priyabeauty',
      followers: '650K',
      niche: 'Beauty',
      gradient: 'from-chart-4/30 to-chart-1/30',
    },
    {
      name: 'Jake T.',
      handle: '@jakecooks',
      followers: '1.8M',
      niche: 'Food',
      gradient: 'from-chart-1/30 to-chart-3/30',
    },
  ],
  campaigns: [
    {
      name: 'Summer Glow Collection',
      creatorCount: 12,
      budget: '$25K budget',
      status: 'Active',
      statusVariant: 'sage',
    },
    {
      name: 'Tech Unboxing Series',
      creatorCount: 8,
      budget: '$40K budget',
      status: 'Review',
      statusVariant: 'lavender',
    },
  ],
  payments: [
    {
      name: 'Luna Nguyen',
      amount: '$2,500',
      status: 'Paid',
      statusVariant: 'sage',
    },
    {
      name: 'Marcus Rivera',
      amount: '$1,800',
      status: 'Pending',
      statusVariant: 'amber',
    },
    {
      name: 'Emma Taylor',
      amount: '$3,200',
      status: 'Paid',
      statusVariant: 'sage',
    },
  ],
  paymentTotal: '$7,500',
  pricing: {
    starter: { price: '$0' },
    growth: { price: '$199', annualPrice: '$159' },
    business: { price: '$499', annualPrice: '$399' },
    enterprise: { price: 'Custom' },
  },
  compliance: ['GDPR Compliant', 'ISO 27001', 'SOC 2'],
  paymentMethods:
    'We accept all major credit cards (Visa, Mastercard, American Express) through Stripe. Enterprise customers can pay via invoice and bank transfer.',
  marketSize: '$21 billion',
}
