import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// Never throws: requestLocale is undefined for routes outside [locale] by design
// (next-intl's own docs name this exact case) — falls back to the default locale
// rather than erroring. messages stays {} since page copy lives in content/*.json
// (typed via src/lib/types/content-types.ts), not a next-intl message catalog.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  return { locale, messages: {} }
})
