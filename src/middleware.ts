import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Excludes API routes, Next internals, Vercel internals, the internal
  // /design-system reference page (not localized, own root layout), and any
  // path containing a dot (static assets, favicon.ico, robots.txt...).
  matcher: ['/((?!api|_next|_vercel|design-system(?:/.*)?|.*\\..*).*)']
}
