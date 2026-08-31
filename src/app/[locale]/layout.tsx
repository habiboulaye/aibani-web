import React from 'react'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { routing } from '../../i18n/routing'
import { absoluteUrl } from '../../lib/seo'
import navigationContent from '../../../content/navigation.json'
import type { NavigationContent } from '../../lib/types/content-types'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

const { contact } = navigationContent as NavigationContent

// docs/specs/07-seo-strategy.md: Organization structured data on every page.
// Contact numbers are the same real, Bénin-first-ordered list already shown
// in the footer (content/navigation.json) — no data invented here.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AiBani',
  url: absoluteUrl('/'),
  logo: absoluteUrl('/images/aibani-logo.jpeg'),
  contactPoint: contact.phones.map(phone => ({
    '@type': 'ContactPoint',
    telephone: phone.number,
    contactType: 'customer service',
    areaServed: phone.country
  }))
}

// Nested layout (not a root layout — <html>/<body> live in src/app/layout.tsx).
// Locale-specific chrome only: NextIntlClientProvider + Header/Footer.
export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <NextIntlClientProvider locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <Header locale={locale} />
      <main className="min-h-[60vh]">{children}</main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  )
}
