import type { LocaleContent } from '@/constants/locale/locale.constants'

export const INDIA_LOCALE: LocaleContent = {
  region: {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    currencySymbol: '₹',
  },
  creators: [
    {
      name: 'Ananya S.',
      handle: '@ananyastyle',
      followers: '1.5M',
      niche: 'Fashion',
      gradient: 'from-chart-1/30 to-chart-2/30',
    },
    {
      name: 'Vikram R.',
      handle: '@vikramfit',
      followers: '890K',
      niche: 'Fitness',
      gradient: 'from-chart-2/30 to-chart-3/30',
    },
    {
      name: 'Meera T.',
      handle: '@meeratravels',
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
      name: 'Arjun K.',
      handle: '@arjuncooks',
      followers: '1.8M',
      niche: 'Food',
      gradient: 'from-chart-1/30 to-chart-3/30',
    },
  ],
  campaigns: [
    {
      name: 'Diwali Glam Collection',
      creatorCount: 12,
      budget: '₹2L budget',
      status: 'Active',
      statusVariant: 'sage',
    },
    {
      name: 'Tech Review Series',
      creatorCount: 8,
      budget: '₹3.5L budget',
      status: 'Review',
      statusVariant: 'lavender',
    },
  ],
  payments: [
    {
      name: 'Ananya Sharma',
      amount: '₹2,08,000',
      status: 'Paid',
      statusVariant: 'sage',
    },
    {
      name: 'Vikram Reddy',
      amount: '₹1,50,000',
      status: 'Pending',
      statusVariant: 'amber',
    },
    {
      name: 'Meera Trivedi',
      amount: '₹2,66,000',
      status: 'Paid',
      statusVariant: 'sage',
    },
  ],
  paymentTotal: '₹6,24,000',
  pricing: {
    starter: { price: '₹0' },
    growth: { price: '₹4,999', annualPrice: '₹3,999' },
    business: { price: '₹14,999', annualPrice: '₹11,999' },
    enterprise: { price: 'Custom' },
  },
  compliance: ['DPDP Act Compliant', 'GDPR Compliant', 'ISO 27001', 'SOC 2'],
  paymentMethods:
    'We accept UPI, NEFT, IMPS, net banking, and all major credit/debit cards (Visa, Mastercard, RuPay). Enterprise customers can pay via invoice and bank transfer.',
  marketSize: '₹1,750 crore',
}
