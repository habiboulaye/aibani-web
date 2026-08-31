import React from 'react'
import homepageContent from '../../../content/homepage.json'
import type { HomepageContent } from '../../lib/types/content-types'
import { buildMetadata } from '../../lib/seo'
import Hero from '../../components/sections/Hero'
import SocialProof from '../../components/sections/SocialProof'
import Problem from '../../components/sections/Problem'
import Solution from '../../components/sections/Solution'
import ForWho from '../../components/sections/ForWho'
import Features from '../../components/sections/Features'
import PatientNetwork from '../../components/sections/PatientNetwork'
import Pricing from '../../components/sections/Pricing'
import Security from '../../components/sections/Security'
import Testimonials from '../../components/sections/Testimonials'
import Faq from '../../components/sections/Faq'
import CTA from '../../components/sections/CTA'

const { meta } = homepageContent as HomepageContent

export function generateMetadata({ params }: { params: { locale: string } }) {
  return buildMetadata({ locale: params.locale, path: '/', title: meta.title, description: meta.description })
}

export default function Home({ params }: { params: { locale: string } }) {
  const { locale } = params
  return (
    <>
      <Hero />
      <SocialProof />
      <Problem />
      <Solution locale={locale} />
      <ForWho locale={locale} />
      <Features />
      <PatientNetwork locale={locale} />
      <Pricing locale={locale} />
      <Security locale={locale} />
      <Testimonials />
      <Faq />
      <CTA locale={locale} />
    </>
  )
}
