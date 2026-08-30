// Single source of truth for raw hex values, for anything that can't consume a Tailwind
// class directly (inline SVG stroke/fill, etc). Mirrors tailwind.config.cjs exactly —
// if you change a value here, change it there too.
//
// Contrast ratios below are computed via the WCAG 2.1 relative-luminance formula.
// AA requires 4.5:1 for normal text, 3:1 for large text (>=18.66px bold / 24px) and for
// non-text UI (focus rings, icon outlines) per SC 1.4.11.

export const colors = {
  lagoon: {
    900: '#0B4F4A', // primary brand fill. White text on it: 9.41:1. As text on paper-50: 8.82:1.
    700: '#146B64' // primary fill hover state. White text on it: 6.33:1.
  },
  ember: {
    // Accent — spec: "rare and deliberate use, never a large section background."
    500: '#E2A63B', // accent fill. ink-900 text on it: 7.58:1. WHITE text on it: 2.15:1 — fails, never use.
    600: '#C3881D', // ember-500 fill's HOVER state only. Not for text-on-light or focus rings (~2.9:1 vs paper-50).
    700: '#855C14' // focus-visible rings / small ember-colored text on light bg. vs paper-50: 5.56:1, vs mist-200: 4.66:1.
    // ember-600 and ember-700 are NOT interchangeable: ink-900 on ember-700 = 2.75:1 (fails) —
    // darkening a fill under dark text makes contrast worse, not better.
  },
  paper: {
    50: '#F6F8F6' // page background
  },
  ink: {
    900: '#122320' // default text. On paper-50: 15.28:1.
  },
  mist: {
    200: '#DCE6E3' // borders, discreet card backgrounds. Second worst-case bg for text contrast after paper-50.
  },
  signal: {
    success: {
      DEFAULT: '#2F9E71', // icons, large text (>=18.66px bold/24px), fills (ink-900 on it: 4.86:1). NOT small text (3.15:1 vs paper-50 — fails).
      text: '#227252' // small status text/labels. vs paper-50: 5.47:1, vs mist-200: 4.58:1.
    },
    alert: {
      DEFAULT: '#C5533E', // icons, large text, fills. NOT small text (4.21:1 vs paper-50 — fails AA by a hair).
      text: '#A94533' // small status text/labels. vs paper-50: 5.49:1, vs mist-200: 4.59:1.
    }
  }
} as const
