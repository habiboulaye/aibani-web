import type { MetadataRoute } from 'next'
import cabinet from '../../content/segments/cabinet.json'
import clinique from '../../content/segments/clinique.json'
import laboratoire from '../../content/segments/laboratoire.json'
import pharmacie from '../../content/segments/pharmacie.json'
import etablissement from '../../content/segments/etablissement.json'
import type { Segment } from '../lib/types/content-types'
import { routing } from '../i18n/routing'
import { absoluteUrl } from '../lib/seo'

const segments = [cabinet, clinique, laboratoire, pharmacie, etablissement] as Segment[]

// Real, currently-published routes only — no placeholder/ghost pages.
// /design-system (internal reference tool) and /api/* are deliberately
// excluded, matching robots.ts. Segments come from the same array
// solutions/[segment]/page.tsx already uses for generateStaticParams, so
// adding/removing a segment updates this automatically.
const paths = ['/', '/solutions', '/patients', '/demo', '/tarifs', ...segments.map(s => `/solutions/${s.slug}`)]

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap(locale =>
    paths.map(path => ({
      url: absoluteUrl(`/${locale}${path === '/' ? '' : path}`)
    }))
  )
}
