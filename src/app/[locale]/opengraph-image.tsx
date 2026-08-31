import homepageContent from '../../../content/homepage.json'
import type { HomepageContent } from '../../lib/types/content-types'
import { renderOgImage, ogImageSize, ogImageContentType } from '../../lib/ogImage'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'AiBani'

const { hero } = homepageContent as HomepageContent

export default async function Image() {
  return renderOgImage(hero.title, 'AiBani')
}
