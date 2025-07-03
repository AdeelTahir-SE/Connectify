
import HeroSection from "@/components/hero-section"
import TierSection from "@/components/tier-section"
import OurServices from "@/components/our-services"
import SignInModal from "@/components/singin-modal"

export const dynamic="force-static"

export default function Home(){
  return (
    <section className="flex flex-col items-center justify-center bg-black">
      <HeroSection />
      <SignInModal/>
      <OurServices />
      <TierSection />

    </section>
  )
}