"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full py-12 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-6 text-center shadow-2xl flex flex-col items-center justify-center">
          
          {/* Constellation Network Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice">
             <path d="M 0 100 Q 150 50 300 150 T 600 100 T 900 150 T 1200 50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
             <path d="M 0 200 Q 200 250 400 150 T 800 250 T 1200 150" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>

          {/* Floating Avatar Nodes */}
          <div className="absolute top-[20%] left-[10%] w-12 h-12 rounded-full border-2 border-white/50 overflow-hidden shadow-lg">
             <img src="https://i.pravatar.cc/100?img=1" alt="user" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-[20%] left-[20%] w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden shadow-lg">
             <img src="https://i.pravatar.cc/100?img=2" alt="user" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-[10%] left-[30%] w-8 h-8 rounded-full border-2 border-white/50 overflow-hidden shadow-lg">
             <img src="https://i.pravatar.cc/100?img=3" alt="user" className="w-full h-full object-cover" />
          </div>

          <div className="absolute top-[30%] right-[10%] w-12 h-12 rounded-full border-2 border-white/50 overflow-hidden shadow-lg">
             <img src="https://i.pravatar.cc/100?img=4" alt="user" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-[10%] right-[25%] w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden shadow-lg">
             <img src="https://i.pravatar.cc/100?img=5" alt="user" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-[15%] right-[30%] w-8 h-8 rounded-full border-2 border-white/50 overflow-hidden shadow-lg">
             <img src="https://i.pravatar.cc/100?img=6" alt="user" className="w-full h-full object-cover" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 relative z-10">
            Ready to Connect<br />With the World?
          </h2>
          <p className="text-blue-100 mb-8 max-w-lg text-sm md:text-base relative z-10">
            Join millions of people and start building meaningful connections today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <Link href="/signup" className="px-8 py-3.5 bg-white text-blue-600 hover:text-blue-700 rounded-full font-bold transition-all clay-btn-white">
              Start Free
            </Link>
            <button className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full font-bold backdrop-blur-md transition-all shadow-[4px_4px_10px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(0,0,0,0.1),inset_2px_2px_5px_rgba(255,255,255,0.2)]">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
