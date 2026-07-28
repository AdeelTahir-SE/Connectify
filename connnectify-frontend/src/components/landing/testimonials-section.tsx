"use client";

import { Star, MessageCircleHeart, ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      image: "https://i.pravatar.cc/150?img=5",
      text: "Connectify has made it so easy to stay connected with my team and friends across the globe."
    },
    {
      name: "Michael Lee",
      image: "https://i.pravatar.cc/150?img=11",
      text: "The video quality is amazing and the random match feature is so much fun!"
    },
    {
      name: "Priya Sharma",
      image: "https://i.pravatar.cc/150?img=47",
      text: "Perfect platform for remote collaboration and building real connections."
    },
    {
      name: "David Brown",
      image: "https://i.pravatar.cc/150?img=33",
      text: "Super easy to use, reliable and packed with awesome features."
    }
  ];

  return (
    <section className="w-full py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16 flex items-center justify-center gap-3">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Loved by people <span className="text-blue-600">worldwide</span>
          </h2>
          <MessageCircleHeart className="w-8 h-8 text-pink-500" />
        </div>

        <div className="relative flex items-center">
          
          <button className="hidden md:flex absolute -left-5 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-colors shadow-sm">
             <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex overflow-x-auto hide-scrollbar gap-6 snap-x snap-mandatory px-4 md:px-8 py-4 w-full">
            {testimonials.map((t, idx) => (
              <div key={idx} className="snap-center shrink-0 w-[280px] md:w-[320px] clay-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <p className="text-sm text-gray-600 font-medium flex-1">&quot;{t.text}&quot;</p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span className="font-bold text-gray-900 text-sm">- {t.name}</span>
                  <div className="flex gap-0.5">
                     {[1,2,3,4,5].map(star => (
                        <Star key={star} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                     ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="hidden md:flex absolute -right-5 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-colors shadow-sm">
             <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
