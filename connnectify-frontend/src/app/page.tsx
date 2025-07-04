
import HeroSection from "@/components/hero-section"
import TierSection from "@/components/tier-section"
import OurServices from "@/components/our-services"
import Header from "@/components/header"
export const dynamic="force-static"

export default function Home(){
  return (
    <section className="flex flex-col items-center justify-center bg-black">
      <Header/>
      <HeroSection />
      <OurServices />
      <TierSection />

    </section>
  )
}