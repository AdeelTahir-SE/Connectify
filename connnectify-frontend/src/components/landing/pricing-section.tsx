"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      features: [
        "Unlimited 1:1 video calls",
        "Dashboard to manage calls & friends",
        "Chatbot assistance",
        "Standard video quality",
        "1:1 video calls to connect instantly"
      ],
      buttonText: "Get Started",
      highlight: false
    },
    {
      name: "Pro",
      price: "$10",
      period: "/month",
      badge: "Most Popular",
      features: [
        "All Free features",
        "Group video calls",
        "Any number of people in group",
        "Enhanced video resolution",
        "Upgrade to team collaboration"
      ],
      buttonText: "Get Started",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "$50",
      period: "/month",
      features: [
        "All Pro features",
        "Random matchmaking",
        "Advanced analytics dashboard",
        "Priority support",
        "Engage, expand & customize"
      ],
      buttonText: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="w-full py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose the best plan for you</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-8 clay-card ${
                plan.highlight 
                ? 'border-2 border-blue-500 scale-105 z-10' 
                : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {plan.badge}
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-blue-600' : 'text-blue-600'}`}>{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-sm font-medium text-gray-500">{plan.period}</span>
              </div>

              <div className="flex-1">
                <ul className="flex flex-col gap-4">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-blue-500' : 'text-blue-300'}`} />
                      <span className="text-sm text-gray-600 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <Link 
                  href="/signup" 
                  className={`w-full flex items-center justify-center py-3.5 rounded-full font-semibold transition-all ${
                    plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700 clay-btn'
                    : 'text-gray-700 hover:text-gray-900 clay-btn-white'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
