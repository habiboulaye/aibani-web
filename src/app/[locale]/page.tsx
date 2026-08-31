import React from 'react'
import Hero from '../../components/sections/Hero'
import SocialProof from '../../components/sections/SocialProof'
import Problem from '../../components/sections/Problem'
import Solution from '../../components/sections/Solution'
import ForWho from '../../components/sections/ForWho'
import Features from '../../components/sections/Features'
import PatientNetwork from '../../components/sections/PatientNetwork'
import Testimonials from '../../components/sections/Testimonials'
import Pricing from '../../components/sections/Pricing'
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
      <Testimonials />
      <Pricing locale={locale} />
      <CTA locale={locale} />
    </>
  )
}
