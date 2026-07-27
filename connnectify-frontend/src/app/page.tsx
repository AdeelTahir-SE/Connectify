"use client"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/landing/features-section"
import VideoExperienceSection from "@/components/landing/video-experience-section"
import GlobalConnectSection from "@/components/landing/global-connect-section"
import RandomMatchSection from "@/components/landing/random-match-section"
import PricingSection from "@/components/landing/pricing-section"
import ToolsSection from "@/components/landing/tools-section"
import CTASection from "@/components/landing/cta-section"

export const dynamic = "force-static"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#050509]">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <VideoExperienceSection />
      <GlobalConnectSection />
      <RandomMatchSection />
      <PricingSection />
      <ToolsSection />
      <CTASection />
      
      <footer className="w-full py-8 border-t border-white/10 text-center text-gray-500 text-sm bg-[#050509]">
        © {new Date().getFullYear()} Connectify. All rights reserved.
      </footer>
    </main>
  )
}