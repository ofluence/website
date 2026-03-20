export interface LocaleRegion {
  code: string
  name: string
  currency: string
  currencySymbol: string
}

export interface LocaleCreator {
  name: string
  handle: string
  followers: string
  niche: string
  gradient: string
}

export interface LocaleCampaign {
  name: string
  creatorCount: number
  budget: string
  status: string
  statusVariant: 'sage' | 'lavender' | 'amber' | 'coral'
}

export interface LocalePayment {
  name: string
  amount: string
  status: string
  statusVariant: 'sage' | 'amber' | 'coral'
}

export interface LocalePricing {
  starter: LocalePricingTier
  growth: LocalePricingTier
  business: LocalePricingTier
  enterprise: LocalePricingTier
}

export interface LocalePricingTier {
  price: string
  annualPrice?: string
}

export interface LocaleContent {
  region: LocaleRegion
  creators: LocaleCreator[]
  campaigns: LocaleCampaign[]
  payments: LocalePayment[]
  paymentTotal: string
  pricing: LocalePricing
  compliance: string[]
  paymentMethods: string
  marketSize: string
  heroMessage?: string
}
