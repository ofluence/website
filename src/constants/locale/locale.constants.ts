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
  location?: string
  demographic?: string
  thumbnail?: string
}

export interface LocaleCampaign {
  name: string
  creatorCount: number
  budget: string
  status: string
  statusVariant: 'ink' | 'stone' | 'cream' | 'vermillion' | 'accent'
}

export interface LocalePayment {
  name: string
  amount: string
  status: string
  statusVariant: 'ink' | 'cream' | 'vermillion' | 'accent'
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
