import React from 'react'
import { notFound } from 'next/navigation'
import cabinet from '../../../../../content/segments/cabinet.json'
import clinique from '../../../../../content/segments/clinique.json'
import laboratoire from '../../../../../content/segments/laboratoire.json'
import pharmacie from '../../../../../content/segments/pharmacie.json'
import etablissement from '../../../../../content/segments/etablissement.json'
import type { Segment } from '../../../../lib/types/content-types'
import SegmentTemplate from '../../../../components/solutions/SegmentTemplate'

const segments = [cabinet, clinique, laboratoire, pharmacie, etablissement] as Segment[]

export function generateStaticParams() {
  return segments.map(segment => ({ segment: segment.slug }))
}

export function generateMetadata({ params }: { params: { segment: string } }) {
  const segment = segments.find(s => s.slug === params.segment)
  return { title: segment?.seoTitle }
}

export default function SegmentPage({ params }: { params: { locale: string; segment: string } }) {
  const segment = segments.find(s => s.slug === params.segment)
  if (!segment) {
    notFound()
  }

  return <SegmentTemplate segment={segment} locale={params.locale} />
}
