import TierCard from "@/components/tier-card";
export default function TierSection(){
 const tiers = [
  {
    heading: "Free",
    price: "$0",
    tagline: "1:1 video calls to connect instantly",
    features: [
      "Unlimited live 1:1 video calls",
      "Basic collaboration tools",
      "Access to public rooms",
      "Standard video quality"
    ]
  },
  {
    heading: "Pro",
    price: "$10/month",
    tagline: "Upgrade to team collaboration",
    features: [
      "All Free features",
      "Host group video calls (up to 10 participants)",
      "Screen sharing and file exchange",
      "Priority email support",
      "Enhanced video resolution"
    ]
  },
  {
    heading: "Enterprise",
    price: "$50/month",
    tagline: "Engage, expand, and customize",
    features: [
      "All Pro features",
      "Random matchmaking: meet new people instantly",
      "Interactive emojis and live reactions",
      "Custom branding and domain",
      "Dedicated account manager",
      "Advanced analytics dashboard"
    ]
  }
];


    return (
        <section className="flex flex-col items-center justify-center">
        
            <h1 className="hero-section-title">Our Tiers</h1>
            <h3 className="text-lg font-semibold text-white">Choose the best plan for you</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] p-12">
                {
                    tiers&&tiers?.length>0&&tiers.map((tier,index)=>{
                        return(
                            <TierCard 
                                key={index} 
                                tagline={tier.tagline}
                                heading={tier.heading} 
                                price={tier.price} 
                                features={tier.features} 
                            />
                        )
                    })
                }

            </div>

        </section>
    )
}