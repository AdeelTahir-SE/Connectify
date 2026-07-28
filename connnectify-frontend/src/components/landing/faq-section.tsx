"use client";

import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    "Is Connectify free to use?",
    "Can I share files during calls?",
    "What is the participant limit for group calls?",
    "How does random matchmaking work?",
    "Is my data and calls secure?",
    "Can I upgrade or downgrade my plan anytime?"
  ];

  return (
    <section className="w-full py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="flex items-center justify-between p-5 clay-card cursor-pointer">
              <span className="font-semibold text-gray-800 text-sm">{faq}</span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Abstract Question Mark Decoration */}
      <div className="absolute top-[20%] right-[10%] opacity-20 md:opacity-100 pointer-events-none z-0 hidden md:block">
         <div className="relative">
            <span className="text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-purple-400 drop-shadow-2xl leading-none" style={{ fontFamily: 'sans-serif' }}>?</span>
         </div>
      </div>
    </section>
  );
}
