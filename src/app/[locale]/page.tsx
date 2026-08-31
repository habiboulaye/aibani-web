import React from 'react'
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
