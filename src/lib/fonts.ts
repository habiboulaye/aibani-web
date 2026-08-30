import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'

// Shared across both root layouts (src/app/[locale]/layout.tsx and
// src/app/design-system/layout.tsx) — next/font's loader calls must not be
// duplicated per file, so they live here once.
export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
export const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
export const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })
