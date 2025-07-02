import HeroSection from "@/components/hero-section"
import TierSection from "@/components/tier-section"
import OurServices from "@/components/our-services"
export default function Home(){
  return (
    <section className="flex flex-col items-center justify-center bg-[#673778]">
      <HeroSection />
      <OurServices />
      <TierSection />

    </section>
  )
}