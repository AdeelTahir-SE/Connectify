"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full py-24 bg-[#050509] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative w-full rounded-[3rem] bg-gradient-to-br from-purple-900/30 to-[#050509] border border-purple-500/20 overflow-hidden flex flex-col md:flex-row items-center min-h-[450px]">
          
          {/* Left side content */}
          <div className="flex-1 p-10 md:p-16 z-10 flex flex-col items-start justify-center text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-md">
              Ready to Connect With the World?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-sm">
              Join millions of people and start building meaningful connections today.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link 
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors text-center shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Start Free
              </Link>
              <Link 
                href="#demo"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-center"
              >
                Schedule Demo
              </Link>
            </div>
          </div>

          {/* Right side abstract globe illustration */}
          <div className="absolute right-0 bottom-0 w-full md:w-1/2 h-[300px] md:h-[500px] pointer-events-none opacity-60 md:opacity-100">
             {/* Huge glowing globe placeholder */}
             <div className="absolute bottom-[-20%] right-[-10%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-[0_0_100px_rgba(147,51,234,0.6)]"></div>
             {/* Overlay pattern for globe (dots) */}
             <div className="absolute bottom-[-20%] right-[-10%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.4) 2px, transparent 2px)', backgroundSize: '15px 15px' }}></div>
             
             {/* Floating elements */}
             <div className="absolute top-[20%] left-[20%] w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/5">
                <img src="https://i.pravatar.cc/150?img=33" alt="user" className="w-8 h-8 rounded-full" />
             </div>
             <div className="absolute top-[40%] right-[20%] w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/5">
                <img src="https://i.pravatar.cc/150?img=47" alt="user" className="w-10 h-10 rounded-full" />
             </div>
             <div className="absolute top-[70%] left-[40%] w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/5">
                <img src="https://i.pravatar.cc/150?img=12" alt="user" className="w-6 h-6 rounded-full" />
             </div>

             {/* Connection lines */}
             <svg className="absolute inset-0 w-full h-full">
                <path d="M 30% 25% Q 50% 10% 75% 45%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="3,3" />
                <path d="M 30% 25% Q 40% 50% 45% 72%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="3,3" />
             </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
