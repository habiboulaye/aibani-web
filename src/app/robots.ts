import type { MetadataRoute } from 'next'
import { absoluteUrl } from '../lib/seo'

// /design-system is an internal reference tool, not a marketing page — the
// closest thing this project has today to spec's "toute future zone de
// prévisualisation" that must stay out of the index.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/design-system']
    },
    sitemap: absoluteUrl('/sitemap.xml')
  }
}
