import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const ogImageSize = { width: 1200, height: 630 }
export const ogImageContentType = 'image/png'

// Real Inter TTF files checked into the repo (src/assets/fonts/) — Satori
// (next/og's renderer) needs an embedded font to render French accented
// characters (é, è, à…) correctly; its default fallback font doesn't cover
// them reliably. Cached across invocations within one build/request lifetime.
let assetsPromise: Promise<{ logo: string; regular: ArrayBuffer; bold: ArrayBuffer }> | null = null

function loadAssets() {
  if (!assetsPromise) {
    assetsPromise = Promise.all([
      readFile(path.join(process.cwd(), 'public/images/aibani-logo.jpeg')),
      readFile(path.join(process.cwd(), 'src/assets/fonts/Inter-Regular.ttf')),
      readFile(path.join(process.cwd(), 'src/assets/fonts/Inter-Bold.ttf'))
    ]).then(([logoBuffer, regularBuffer, boldBuffer]) => ({
      logo: `data:image/jpeg;base64,${logoBuffer.toString('base64')}`,
      regular: regularBuffer.buffer.slice(regularBuffer.byteOffset, regularBuffer.byteOffset + regularBuffer.byteLength),
      bold: boldBuffer.buffer.slice(boldBuffer.byteOffset, boldBuffer.byteOffset + boldBuffer.byteLength)
    }))
  }
  return assetsPromise
}

// One shared branded card design, reused by every opengraph-image.tsx route —
// real page title, real logo, real brand tokens (tailwind.config.cjs's
// lagoon-900/ember-500), no invented screenshots or marketing photography.
export async function renderOgImage(title: string, eyebrow: string) {
  const { logo, regular, bold } = await loadAssets()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0B4F4A',
          padding: 64,
          fontFamily: 'Inter'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={64} height={56} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 28, fontWeight: 400, color: '#E2A63B', marginBottom: 16 }}>{eyebrow}</div>
          <div style={{ fontSize: 56, fontWeight: 700, color: '#F6F8F6', lineHeight: 1.2, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div style={{ width: 96, height: 8, backgroundColor: '#E2A63B' }} />
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: bold, weight: 700, style: 'normal' }
      ]
    }
  )
}
