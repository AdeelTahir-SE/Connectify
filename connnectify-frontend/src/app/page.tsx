"use client"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import WhySection from "@/components/landing/why-section"
import HowItWorksSection from "@/components/landing/how-it-works"
import GlobalConnectSection from "@/components/landing/global-connect-section"
import VideoExperienceSection from "@/components/landing/video-experience-section"
import PricingSection from "@/components/landing/pricing-section"
import TestimonialsSection from "@/components/landing/testimonials-section"
import FAQSection from "@/components/landing/faq-section"
import CTASection from "@/components/landing/cta-section"
import Footer from "@/components/footer"

export const dynamic = "force-static"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      <Header />
      <HeroSection />
      <WhySection />
      <HowItWorksSection />
      <GlobalConnectSection />
      <VideoExperienceSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}