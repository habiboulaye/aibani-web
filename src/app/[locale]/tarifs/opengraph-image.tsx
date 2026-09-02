import tarifsContent from '../../../../content/tarifs.json'
import type { TarifsContent } from '../../../lib/types/content-types'
import { renderOgImage, ogImageSize, ogImageContentType } from '../../../lib/ogImage'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'AiBani'

const { title } = tarifsContent as TarifsContent

export default async function Image() {
  return renderOgImage(title, 'AiBani')
}
