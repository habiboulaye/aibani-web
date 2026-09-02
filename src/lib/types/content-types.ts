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

export type TestimonialsContent = {
  title: string
  testimonials: Testimonial[]
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
  availabilityNote?: string
}

export type ParcoursStep = {
  role: string
  action: string
}

export type NetworkStep = {
  title: string
  detail: string
}

export type SeoMeta = {
  title: string
  description: string
}

export type HomepageContent = {
  meta: SeoMeta
  hero: {
    title: string
    subtitle: string
  }
  problem: {
    title: string
    intro: string
    conclusion: string
    beforeLabel: string
    afterLabel: string
    before: string[]
    after: string[]
  }
  solution: {
    title: string
    subtitle: string
    steps: ParcoursStep[]
    note: string
    text: string
    ctaLabel: string
    ctaHref: string
  }
  forWho: {
    title: string
    // Keyed by Segment.id — distinct from Segment.ctaLabel, which is written for
    // that segment's own future /solutions/[slug] hero and can read as a
    // conversion promise (e.g. "Rejoindre le réseau gratuitement"). These are
    // navigation-only labels for the homepage teaser grid, verbatim from
    // docs/source-material/homepage-content-v1-recommandee.md §6.
    cardCtaLabels: Record<string, string>
  }
  features: {
    title: string
    items: HomepageFeatureItem[]
  }
  patientNetwork: {
    title: string
    text: string
    steps: NetworkStep[]
    ctaLabel: string
    ctaHref: string
  }
  security: {
    title: string
    intro: string
    hostingLabel: string
    hosting: string
    complianceLabel: string
    compliance: string
    commitmentsIntro: string
    commitments: string[]
    ctaLabel: string
    ctaHref: string
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
    solutions: FooterColumn
    product: FooterColumn
    company: FooterColumn
    trust: FooterColumn
    support: FooterColumn
  }
}

export type FooterColumn = {
  title: string
  links: NavLink[]
}

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export type FaqContent = {
  title: string
  items: FaqItem[]
}

export type Segment = {
  id: string
  slug: string
  name: string
  seoTitle: string
  seoDescription: string
  heroTitle: string
  heroSubtitle: string
  painPoints: string[]
  highlightedFeatureIds: string[]
  recommendedTierId: string
  // 'available': fully built. 'network-only': real network presence, advanced
  // management module still in construction — cf. content/segments/pharmacie.json
  // and CLAUDE.md's "ne jamais afficher un module comme disponible partout".
  maturity: 'available' | 'network-only'
  maturityNote?: string
  ctaLabel: string
  trustSignalIds?: string[]
  testimonialIds: string[]
}

export type SolutionsContent = {
  hub: {
    title: string
    intro: string
  }
  meta: SeoMeta
  painPointsLabel: string
  featuresLabel: string
  recommendedTierLabel: string
  recommendedTierCtaLabel: string
}

export type PatientStep = {
  title: string
  detail: string
}

export type PatientsContent = {
  title: string
  seoDescription: string
  subtitle: string
  howItWorksTitle: string
  steps: PatientStep[]
  downloadCtaLabel: string
  appStoreLabel: string
  appStoreUrl: string
  playStoreLabel: string
  playStoreUrl: string
  findProfessionalCtaLabel: string
  findProfessionalHref: string
  proGatewayText: string
  proGatewayCtaLabel: string
}

export type DemoFormFieldContent = {
  label: string
  hint?: string
}

export type DemoFormContent = {
  fields: {
    name: DemoFormFieldContent
    establishment: DemoFormFieldContent
    size: DemoFormFieldContent
    mainNeed: DemoFormFieldContent
    // Added beyond docs/specs/04-content-pages.md's field list (name,
    // establishment, size, mainNeed only) — see docs/decisions/0010-*.md.
    email: DemoFormFieldContent
    phone: DemoFormFieldContent
  }
  honeypotLabel: string
  submitLabel: string
  submittingLabel: string
  successMessage: string
  privacyNote: string
  errors: {
    nameRequired: string
    establishmentRequired: string
    sizeRequired: string
    emailRequired: string
    emailInvalid: string
    malformed: string
    submitFailed: string
    networkFailed: string
  }
}

export type DemoContent = {
  hero: { title: string; subtitle: string }
  seoDescription: string
  form: DemoFormContent
}

export type TarifsTierCta = {
  // Absent when this tier's /tarifs-page CTA wording is identical to
  // pricing.json's own tier.ctaLabel (see docs/specs/01-vision-positioning-
  // personas.md's per-page CTA table) — falls back to tier.ctaLabel.
  primaryLabel?: string
  secondaryLabel?: string
  // Shown for tiers whose CTA promises something ("essai", "créer mon
  // établissement") that today actually routes to /demo, since no self-serve
  // signup flow exists yet — sets honest expectations instead of a silent
  // bait-and-switch.
  followupNote?: string
}

export type ConsentContent = {
  message: string
  acceptLabel: string
  refuseLabel: string
  manageLabel: string
}

export type TarifsContent = {
  title: string
  seoDescription: string
  intro: string
  socialProofIntro: string
  comparisonTitle: string
  calculatorLabel: string
  calculatorPricePrefix: string
  calculatorNote: string
  switchToClinicNote: string
  switchToClinicLinkLabel: string
  modulesComingTitle: string
  modulesComingBadgeLabel: string
  // Keyed by PricingTier.id.
  tierCtas: Record<string, TarifsTierCta>
}
