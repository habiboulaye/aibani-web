// Design tokens for docs/specs/05-design-system.md ("clarté clinique, chaleur humaine").
// Only NEW top-level keys are added here — never redefine keys Tailwind already owns
// (slate/blue/amber, fontSize.lg/xl/2xl, etc.), since 32+ existing usages across
// Header/Footer/Hero/Features/Pricing/CTA rely on the stock palette and scale and are
// out of Phase 2's scope. fontFamily.sans/.mono is the one deliberate exception below.
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        lagoon: { 900: '#0B4F4A', 700: '#146B64' },
        // ember-500 is the spec'd accent fill (rare, deliberate use — never a large bg).
        // ember-600 = hover state for an ember-500 fill ONLY.
        // ember-700 = focus rings / small ember-colored text on light backgrounds ONLY.
        // These are NOT interchangeable: darkening a fill under dark text makes contrast
        // worse, not better (ink-900 on ember-700 = 2.75:1, fails). See src/styles/tokens.ts.
        ember: { 500: '#E2A63B', 600: '#C3881D', 700: '#855C14' },
        paper: { 50: '#F6F8F6' },
        ink: { 900: '#122320' },
        mist: { 200: '#DCE6E3' },
        signal: {
          success: { DEFAULT: '#2F9E71', text: '#227252' },
          alert: { DEFAULT: '#C5533E', text: '#A94533' }
        }
      },
      fontFamily: {
        // Safe to override globally: zero existing font-sans/font-mono usage in src/.
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace']
      },
      fontSize: {
        // existing xs/sm/base (12/14/16) already match the spec's scale — untouched.
        'body-lg': ['1.25rem', { lineHeight: '1.6' }], // 20px
        'display-sm': ['clamp(1.375rem, 1.1rem + 1.2vw, 1.75rem)', { lineHeight: '1.15' }], // 28px desktop
        'display-md': ['clamp(1.75rem, 1.3rem + 2vw, 2.5rem)', { lineHeight: '1.1' }], // 40px desktop
        'display-lg': ['clamp(2.125rem, 1.4rem + 3.2vw, 3.5rem)', { lineHeight: '1.05' }] // 56px desktop
      },
      borderRadius: {
        control: '0.5rem', // buttons, inputs
        card: '1rem' // cards
      },
      boxShadow: {
        // ink-900-tinted, not pure black — "une ombre = une élévation réelle"
        card: '0 8px 24px -8px rgba(18,35,32,0.18), 0 2px 6px -2px rgba(18,35,32,0.10)'
      }
    }
  },
  plugins: []
}
