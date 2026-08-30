import React from 'react'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { routing } from '../../i18n/routing'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
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
      <Header locale={locale} />
      <main className="min-h-[60vh]">{children}</main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  )
}
