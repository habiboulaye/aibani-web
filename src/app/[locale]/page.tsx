import React from 'react'
import Hero from '../../components/sections/Hero'
import SocialProof from '../../components/sections/SocialProof'
import Features from '../../components/sections/Features'
import Testimonials from '../../components/sections/Testimonials'
import Pricing from '../../components/sections/Pricing'
import CTA from '../../components/sections/CTA'

export default function Home({ params }: { params: { locale: string } }) {
  const { locale } = params
  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <Testimonials />
      <Pricing locale={locale} />
      <CTA locale={locale} />
    </>
  )
}
