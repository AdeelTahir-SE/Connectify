"use client";

import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Unlimited 1:1 video calls",
      "Dashboard to manage calls & friends",
      "Chatbot assistance",
      "Standard video quality",
      "1:1 video calls to connect instantly"
    ],
    buttonText: "Get Started",
    buttonStyle: "border border-white/20 hover:bg-white/10 text-white",
    popular: false,
  },
  {
    name: "Pro",
    price: "$10",
    description: "Great for regular users",
    features: [
      "All Free features",
      "Group video calls",
      "Any number of people in group",
      "Enhanced video resolution",
      "Upgrade to team collaboration"
    ],
    buttonText: "Get Started",
    buttonStyle: "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$50",
    description: "For teams and businesses",
    features: [
      "All Pro features",
      "Random matchmaking",
      "Advanced analytics dashboard",
      "Priority support",
      "Engage, expand & customize"
    ],
    buttonText: "Contact Sales",
    buttonStyle: "border border-white/20 hover:bg-white/10 text-white",
    popular: false,
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="w-full py-24 bg-[#050509]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Choose the <span className="text-purple-400">best plan</span> for you
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col p-8 rounded-3xl ${
                plan.popular 
                ? 'bg-purple-900/10 border-2 border-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.15)] transform md:-translate-y-4' 
                : 'bg-white/[0.02] border border-white/5'
              } transition-transform hover:scale-[1.02]`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>

              <ul className="flex flex-col gap-4 mb-8 flex-1">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-full font-semibold transition-all ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
