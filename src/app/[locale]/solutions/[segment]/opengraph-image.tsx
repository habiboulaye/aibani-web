import cabinet from '../../../../../content/segments/cabinet.json'
import clinique from '../../../../../content/segments/clinique.json'
import laboratoire from '../../../../../content/segments/laboratoire.json'
import pharmacie from '../../../../../content/segments/pharmacie.json'
import etablissement from '../../../../../content/segments/etablissement.json'
import type { Segment } from '../../../../lib/types/content-types'
import { renderOgImage, ogImageSize, ogImageContentType } from '../../../../lib/ogImage'

const segments = [cabinet, clinique, laboratoire, pharmacie, etablissement] as Segment[]

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'AiBani'

export default async function Image({ params }: { params: { segment: string } }) {
  const segment = segments.find(s => s.slug === params.segment)
  return renderOgImage(segment?.heroTitle ?? 'AiBani', 'Solutions AiBani')
}
