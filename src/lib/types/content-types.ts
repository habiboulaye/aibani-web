export type StatItem = {
  id: string
  value: number | string | null
  suffix?: string | null
  label: string
  confirmed?: boolean
  displayNote?: string
}

export type Testimonial = {
  id: string
  quote: string
  author: string
  role?: string
}

export type PricingFeature = {
  label: string
  availabilityNote?: string
}

export type PricingTier = {
  id: string
  name: string
  price: number | null
  priceLabel: string
  priceNote?: string | null
  audienceBadge?: string
  tagline: string
  ctaLabel: string
  ctaStyle: 'primary' | 'secondary'
  includesTierId?: string
  featureIds: string[]
  microcopy?: string | null
  pricingModel?: 'per-practitioner'
  perAdditionalPractitioner?: number
  maxPractitioners?: number
  priceAtMaxPractitioners?: number
}

export type StandaloneModule = {
  id: string
  name: string
  availability: 'available' | 'roadmap'
}

export type PricingContent = {
  title: string
  subtitle?: string
  patientNote?: string
  currency: string
  tiers: PricingTier[]
  standaloneModules: StandaloneModule[]
  features: Record<string, PricingFeature>
}

export type TrustSignal = {
  id: string
  issuer: string
  type: string
  date: string
  reference: string
  scope: string
  publicStatement: string
  doNotClaim: string[]
  sourceDocument: string
  displaySegments: string[]
  confirmed: boolean
}

export type TrustSignalsContent = {
  signals: TrustSignal[]
}

export type NavLink = {
  label: string
  href: string
  external?: boolean
}

export type NavDropdown = {
  label: string
  type: 'dropdown'
  children: NavLink[]
}

export type ContactPhone = {
  country: string
  label: string
  number: string
  primary: boolean
}

export type HomepageFeatureItem = {
  id: string
  title: string
  description: string
}

export type HomepageContent = {
  hero: {
    title: string
    subtitle: string
  }
  features: {
    title: string
    items: HomepageFeatureItem[]
  }
  finalCta: {
    title: string
    subtitle: string
    ctaLabel: string
    ctaHref: string
  }
}

export type NavigationContent = {
  primary: (NavLink | NavDropdown)[]
  secondary: NavLink[]
  primaryCta: NavLink
  activeCountries: string[]
  locales: {
    active: string[]
    default: string
    roadmap: string[]
  }
  contact: {
    phones: ContactPhone[]
  }
  footer: {
    solutions: NavLink[]
    product: NavLink[]
    company: NavLink[]
    trust: NavLink[]
    support: NavLink[]
  }
}
