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
  platforms: string[]
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
  handle: string
  avatar: string
  platforms: string[]
  amount: string
  amountValue: number
  status: string
  statusVariant: 'ink' | 'cream' | 'vermillion' | 'accent'
  campaign: string
  duration: string
  followers: string
  demographic: string
  roas: string
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
  pricing: LocalePricing
  compliance: string[]
  paymentMethods: string
  marketSize: string
  heroMessage?: string
}
